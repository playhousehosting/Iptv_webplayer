# KNOWLEDGE.md - LLM Project Handoff Guide

## Project Overview
**IPTV Web Player** - A modern, feature-rich web-based IPTV streaming application with advanced playback capabilities and Xtreme Codes provider support.

## Architecture & Technical Stack

### Core Technologies
- **Frontend**: Pure HTML5/CSS3/JavaScript (no build process)
- **Styling**: Tailwind CSS (CDN) - Modern utility-first framework
- **Video**: HTML5 `<video>` element with HLS.js library
- **Storage**: Browser localStorage for playlist management
- **Dependencies**: 
  - HLS.js v1.5+ (HTTP Live Streaming support)
  - Tailwind CSS v3+ (UI framework)
  - Google Fonts Inter (typography)

### File Structure
```
iptv-webplayer/
├── webplayer.html          # Main application (single-file architecture)
├── README.md               # User documentation
├── CHANGELOG.md            # Version history
├── KNOWLEDGE.md            # This file - LLM handoff guide
├── .gitignore             # Git ignore patterns
└── .github/
    ├── copilot-instructions.md  # GitHub Copilot context
    └── ISSUE_TEMPLATE/
        ├── bug_report.md
        ├── feature_request.md
        └── copilot_task.md
```

## Key Application Components

### 1. Core State Management (`appState` object)
```javascript
const appState = {
    allChannels: [],        // Parsed M3U channels
    filteredChannels: [],   // Search/filter results
    currentChannel: null,   // Currently playing channel
    hls: null,             // HLS.js instance
    playlists: [],         // Saved playlist configurations
    epgData: {},           // Electronic Program Guide data
    debug: false           // Debug panel state
};
```

### 2. Video Player Integration
- **Primary**: HTML5 video element with native controls
- **Enhancement**: HLS.js for advanced stream support
- **Fallbacks**: Multiple playback strategies for compatibility
- **Features**: Fullscreen, Picture-in-Picture, quality selection

### 3. Playlist Support Systems

#### M3U Format Support
- Standard M3U/M3U8 parsing with EXTINF metadata
- Group categorization and logo extraction
- EPG integration via XMLTV format

#### Xtreme Codes Integration
- Portal authentication (URL + credentials)
- Dynamic M3U generation via API endpoints
- Stream URL transformation (.ts → .m3u8)
- Provider-specific error handling

### 4. Network & CORS Handling
**Critical**: Multiple proxy fallback system for CORS restrictions:
```javascript
const PROXY_SERVERS = [
    'https://cors-anywhere.herokuapp.com/',
    'https://api.allorigins.win/raw?url=',
    // ... 7 total proxy options
];
```

## Important Code Patterns

### Error Handling Strategy
1. **User-Friendly Messages**: Always show clear error messages to users
2. **Technical Logging**: Detailed console logs for debugging
3. **Graceful Degradation**: Fallback options when primary methods fail
4. **Recovery Mechanisms**: Automatic retry with different approaches

### UI State Management
- **Loading States**: Multi-step progress indicators with timing
- **Status Indicators**: Visual feedback (online/loading/error)
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

### Stream Playback Logic
```javascript
// Primary playback attempt order:
1. Direct video.src assignment
2. HLS.js for .m3u8 streams
3. Proxy fallback with HLS.js
4. Error handling and user notification
```

## Common Modification Patterns

### Adding New Features
1. **State**: Add to `appState` object if persistent data needed
2. **UI**: Use Tailwind utility classes for consistency
3. **Events**: Follow existing event listener patterns
4. **Error Handling**: Always include try/catch and user feedback

### Troubleshooting Playback Issues
1. Check browser console for detailed error logs
2. Verify stream URL accessibility
3. Test with different proxy servers
4. Validate M3U/playlist format

### Xtreme Codes Integration Points
- `generateXtremeCodesM3U()` - M3U generation from credentials
- Stream URL processing - automatic .ts to .m3u8 conversion
- Error messages specific to Xtreme Codes authentication

## Browser Compatibility Notes

### Supported Browsers
- **Chrome/Chromium**: Full feature support
- **Firefox**: Full support with minor CSS differences
- **Safari**: Full support, some video format limitations
- **Edge**: Full Chromium-based support

### Known Limitations
- **iOS Safari**: Limited video format support, no pip
- **Older Browsers**: Requires modern ES6+ support
- **CORS**: Dependent on proxy servers for some streams

## Security Considerations

### Current Implementations
- No sensitive data stored in localStorage beyond URLs
- CORS proxy usage for stream access
- No server-side components (client-only)

### Xtreme Codes Credentials
- Stored in localStorage (consider encryption for production)
- Transmitted via standard HTTP (ensure HTTPS deployment)

## Performance Characteristics

### Strengths
- Single-file deployment (easy hosting)
- Client-side only (no server requirements)
- Efficient playlist parsing
- Responsive UI with minimal JavaScript

### Optimization Opportunities
- Large playlist handling (1000+ channels)
- EPG data caching and management
- Video preloading strategies

## Future Enhancement Areas

### High Priority
1. **PWA Features**: Service worker, offline capability
2. **Enhanced EPG**: Better program guide integration
3. **Playlist Management**: Import/export, synchronization

### Medium Priority
1. **Stream Recording**: Browser-based recording capabilities
2. **Chromecast Support**: Media casting integration
3. **Keyboard Navigation**: Full keyboard control

### Low Priority
1. **Themes**: Multiple UI themes beyond dark mode
2. **Analytics**: Usage tracking (privacy-conscious)
3. **Multilingual**: i18n support

## Testing & Debugging Guidelines

### Debug Panel Usage
- Toggle with dedicated button in UI
- Real-time error logging and stream diagnostics
- Network request monitoring

### Common Issues & Solutions
1. **CORS Errors**: Try different proxy servers, check stream URLs
2. **Video Won't Play**: Verify format support, check console logs
3. **Playlist Loading**: Validate M3U format, check URL accessibility
4. **Xtreme Codes**: Verify credentials, check portal API compatibility

## Deployment Notes

### Simple Deployment
- Single HTML file can be served from any web server
- No build process or compilation required
- CDN dependencies (Tailwind, HLS.js) - consider local hosting for production

### Production Considerations
- Use HTTPS for secure credential handling
- Consider Content Security Policy (CSP) headers
- Monitor proxy server availability and performance

---

**Last Updated**: 2025-01-27  
**Version**: 2.0.0  
**Maintainer**: GitHub Copilot Compatible
