// Vercel serverless function for CORS proxy
export default async function handler(req, res) {
  // Enable CORS with secure headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Accept, Accept-Language, Content-Type, Range');
  res.setHeader('Access-Control-Expose-Headers', 'Content-Length, Content-Range, Content-Type');
  
  // Security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  const { url } = req.query;
  
  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  // Only allow GET and HEAD methods for security
  if (!['GET', 'HEAD'].includes(req.method)) {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Decode and validate the URL
    const decodedUrl = decodeURIComponent(url);
    const parsedUrl = new URL(decodedUrl);
    
    // Security: Only allow HTTP/HTTPS protocols
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return res.status(400).json({ error: 'Invalid protocol. Only HTTP/HTTPS allowed.' });
    }
    
    // Set up fetch options with minimal, safe headers
    const fetchOptions = {
      method: req.method,
      headers: {
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9'
      },
      signal: AbortSignal.timeout(30000), // 30 second timeout
      redirect: 'follow'
    };

    // Forward only safe headers from the original request
    const safeHeaders = ['range', 'accept', 'accept-language'];
    safeHeaders.forEach(header => {
      if (req.headers[header]) {
        fetchOptions.headers[header] = req.headers[header];
      }
    });    // Make the request
    const response = await fetch(decodedUrl, fetchOptions);
    
    // Handle response status
    if (!response.ok) {
      console.warn(`Proxy request failed: ${response.status} ${response.statusText} for ${decodedUrl}`);
      return res.status(response.status).json({ 
        error: `Source returned ${response.status}`, 
        details: response.statusText,
        url: decodedUrl
      });
    }
    
    // Forward safe response headers for streaming
    const safeResponseHeaders = ['content-type', 'content-length', 'content-range', 'accept-ranges'];
    safeResponseHeaders.forEach(headerName => {
      const headerValue = response.headers.get(headerName);
      if (headerValue) {
        res.setHeader(headerName, headerValue);
      }
    });

    // Set response status
    res.status(response.status);
    
    // Stream the response body efficiently
    if (response.body) {
      const reader = response.body.getReader();
      
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          res.write(Buffer.from(value));
        }
      } finally {
        reader.releaseLock();
      }
    }
    
    res.end();    
  } catch (error) {
    console.error('Proxy error:', error.name, error.message);
    
    // Handle specific error types
    if (error.name === 'AbortError') {
      return res.status(408).json({ 
        error: 'Request timeout', 
        details: 'The request took too long to complete',
        url: url 
      });
    }
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return res.status(502).json({ 
        error: 'Network error', 
        details: 'Unable to connect to the source',
        url: url 
      });
    }
    
    res.status(500).json({ 
      error: 'Proxy request failed', 
      details: error.message,
      url: url
    });
  }
}
