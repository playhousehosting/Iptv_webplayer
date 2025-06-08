# Vercel Deployment Troubleshooting Guide

## 🚀 Quick Fix Checklist

**If streams don't work on Vercel but work locally:**

1. **Enable Debug Panel**: Click "Debug" button (bottom-right) to see detailed error info
2. **Check Browser Console**: Press F12 → Console tab for network errors
3. **Try Different Streams**: Test with known working streams (HTTP vs HTTPS)
4. **Clear Browser Cache**: Ctrl+Shift+Delete → Clear everything
5. **Test Different Browsers**: Chrome usually has best compatibility

## 🔧 Common Issues and Solutions

### 1. Stream Playback Errors on Vercel (but works locally)

**Symptoms:**
- Videos won't play when deployed to Vercel
- CORS errors in browser console
- "Network error" or "Media error" messages
- Proxy servers failing
- Works fine when running locally

**Root Causes & Solutions:**

#### A. **Mixed Content Security Issues**
```
❌ Problem: HTTP streams blocked on HTTPS Vercel domains
✅ Solution: Use HTTPS streams when possible, or enable proxy fallback
```

#### B. **Vercel Edge Network Restrictions**
```
❌ Problem: Vercel's CDN blocks certain stream sources
✅ Solution: Enhanced proxy list with Vercel-compatible servers
```

#### C. **Cloud Environment Timeouts**
```
❌ Problem: Shorter timeouts in cloud vs local development
✅ Solution: Increased HLS.js timeouts and retry attempts
```

### 2. Enhanced Proxy Configuration (Already Applied)

The app now includes **Vercel-optimized proxy servers**:
- `api.allorigins.win` (primary for Vercel)
- `cors-anywhere.herokuapp.com` (reliable backup)
- `corsproxy.io` (fast response times)
- Additional cloud-friendly proxies

### 3. Stream Format Compatibility

#### ✅ **Best Compatibility (Works on Vercel)**
```
https://example.com/stream.m3u8    # HTTPS HLS streams
https://example.com/playlist.m3u  # HTTPS M3U playlists
```

#### ⚠️ **May Need Proxies**
```
http://server:port/user/pass/123.m3u8   # HTTP HLS streams
http://server:port/user/pass/123.ts     # HTTP Transport streams
```

#### ❌ **Likely to Fail on Vercel**
```
rtmp://server/stream               # RTMP not supported in browsers
rtsp://server/stream               # RTSP not supported in browsers
```

### 4. Debug Panel Usage

**How to Use Debug Panel:**
1. Click **"Debug"** button (bottom-right corner)
2. Try playing a problematic stream
3. Monitor the debug information:
   - **URL**: Current stream being attempted
   - **Method**: Playback method (HLS.js, Direct, Proxy)
   - **Status**: Current status and error messages
   - **Support**: Browser capabilities
   - **Attempts**: Number of retry attempts
4. Click **"Copy Debug Info"** to share technical details

**Debug Status Meanings:**
- `Initializing` → Starting playback process
- `Attempting HLS.js playback` → Using HLS.js library
- `Attempting proxy playback` → Trying CORS proxy
- `Playing successfully` → Stream is working
- `Failed` → All methods exhausted

### 5. Vercel-Specific Browser Behavior

#### **Chrome/Edge (Recommended)**
- Best HLS.js support
- Most permissive CORS handling
- Best performance on Vercel

#### **Firefox**
- Stricter CORS policies (may need more proxies)
- Good HLS.js support
- May require proxy for HTTP streams

#### **Safari**
- Native HLS support (good for M3U8)
- Strict security policies
- Limited codec support

### 6. Network and Performance Optimization

#### **Already Applied Improvements:**
- ✅ Increased timeout values for cloud latency
- ✅ Enhanced retry logic with exponential backoff
- ✅ Optimized buffer settings for cloud deployment
- ✅ Better User-Agent strings for server compatibility
- ✅ Progressive proxy fallback with delays

#### **User Actions for Better Performance:**
- Use **Auto Quality** setting for adaptive streaming
- Clear browser cache regularly
- Test during off-peak hours (less network congestion)
- Consider using VPN if geographic restrictions apply

### 7. Deployment Verification

**After deploying to Vercel:**
1. Test with a known working M3U8 stream
2. Check browser console for errors
3. Try multiple proxy servers via debug panel
4. Test on different devices/networks

## 🆘 If Nothing Works

### **Last Resort Debugging:**
1. **Test the stream in VLC**: If it doesn't work in VLC, the stream itself is the issue
2. **Check stream provider**: Contact your IPTV provider for web-compatible URLs
3. **Use local development**: The app should always work locally
4. **Try different networks**: Some ISPs block IPTV streams

### **Alternative Solutions:**
- Use **VPN** to bypass geographic restrictions
- Contact stream provider for **HTTPS URLs**
- Consider using **dedicated IPTV apps** for problematic streams
- Set up your **own CORS proxy server**

## 📋 Technical Details

### **Vercel Configuration Applied:**
- Enhanced CORS headers for media streaming
- Proper caching policies for dynamic content
- Extended function timeouts for stream processing
- Cross-origin policies for embedded content

### **HLS.js Optimization for Cloud:**
- Increased timeout values (25s vs 10s locally)
- Enhanced retry logic (6 attempts vs 3)
- Better error recovery mechanisms
- Cloud-optimized buffer management

**Your app is now optimized for Vercel deployment. Most common playback issues should be resolved.**

### 5. Debugging Steps

#### Step 1: Basic Troubleshooting
1. Open browser developer tools (F12)
2. Check Console tab for errors
3. Check Network tab for failed requests
4. Try a different browser

#### Step 2: Test with Simple Streams
Use these test streams to verify functionality:
```
# Test M3U8 (Apple's sample)
https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_adv_example_hevc/master.m3u8

# Test MP4
https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
```

#### Step 3: Stream Provider Issues
- Verify streams work in VLC or other players
- Check if stream provider blocks cloud IPs
- Contact stream provider about Vercel compatibility

### 6. Xtreme Codes Specific Issues

#### A. Authentication Errors
```
Error: Invalid credentials or server not responding
```
Solutions:
- Verify portal URL includes port (e.g., `:8080`)
- Check username/password are correct
- Test credentials in a browser directly

#### B. Stream Format Issues
```
Error: Stream format not supported
```
Solutions:
- The app auto-converts `.ts` to `.m3u8`
- Some Xtreme Codes servers may not support this
- Try accessing the portal's M3U URL directly

### 7. Performance Optimization

#### For Large Playlists (1000+ channels)
1. Use search/filter to reduce displayed channels
2. Clear favorites/recents periodically
3. Consider chunked loading for very large lists

#### For Mobile Users
1. Use "Low Quality" setting
2. Enable data saver in browser
3. Use WiFi when possible

### 8. Contact Support

If issues persist:
1. Enable debug panel and copy error info
2. Include browser type and version
3. Specify if issue is Vercel-specific
4. Provide example stream URL (if safe to share)

### 9. Alternative Deployment Options

If Vercel doesn't work for your use case:
- **Netlify**: Similar static hosting
- **GitHub Pages**: Free static hosting
- **Cloudflare Pages**: Edge deployment
- **Self-hosting**: Use nginx or Apache

---

**Remember**: IPTV stream compatibility varies greatly between providers. What works locally may not work in cloud environments due to IP restrictions, geographic blocking, or security policies.
