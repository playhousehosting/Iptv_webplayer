// Vercel serverless function for CORS proxy
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization, Range');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { url } = req.query;
  
  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    // Decode the URL
    const decodedUrl = decodeURIComponent(url);
    
    // Validate URL
    new URL(decodedUrl);
    
    // Set up fetch options with proper headers
    const fetchOptions = {
      method: req.method,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      },
      timeout: 15000
    };

    // Forward specific headers from the original request
    const forwardHeaders = ['range', 'authorization', 'referer'];
    forwardHeaders.forEach(header => {
      if (req.headers[header]) {
        fetchOptions.headers[header] = req.headers[header];
      }
    });

    // Make the request
    const response = await fetch(decodedUrl, fetchOptions);
    
    // Forward response headers
    const responseHeaders = {};
    response.headers.forEach((value, key) => {
      // Forward important headers for streaming
      if (['content-type', 'content-length', 'content-range', 'accept-ranges', 'cache-control'].includes(key.toLowerCase())) {
        responseHeaders[key] = value;
      }
    });

    // Set response headers
    Object.entries(responseHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    // Stream the response
    res.status(response.status);
    
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
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: 'Proxy request failed', 
      details: error.message,
      url: url
    });
  }
}
