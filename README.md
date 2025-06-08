# IPTV Web Player

A modern, feature-rich web-based IPTV player that supports M3U playlists and Xtreme Codes providers with advanced streaming capabilities.

## Features

### 🎮 Playback Features
- **Multi-format Support**: M3U8 (HLS), MP4, and Transport Stream (.ts) files
- **Xtreme Codes Integration**: Native support for Xtreme Codes portals
- **Smart URL Conversion**: Automatically converts .ts URLs to M3U8 format
- **HLS.js Integration**: Advanced streaming with fallback support
- **Picture-in-Picture**: Modern browser PiP support
- **Fullscreen Mode**: Immersive viewing experience

### 📺 User Interface
- **Modern Design**: Tailwind CSS responsive interface
- **Dark Theme**: Eye-friendly dark mode design
- **Mobile Responsive**: Works on all device sizes
- **Keyboard Shortcuts**: Quick navigation and controls
- **Loading Indicators**: Real-time progress feedback
- **Quality Selection**: Stream quality options

### 🔧 Advanced Features
- **Playlist Management**: Support for multiple playlists
- **Favorites System**: Mark and organize favorite channels
- **Recent Channels**: Quick access to recently watched
- **Search & Filter**: Find channels by name or group
- **EPG Support**: Electronic Program Guide integration
- **Debug Panel**: Real-time diagnostics and troubleshooting

### 🌐 Network & Compatibility
- **CORS Proxy Fallbacks**: Multiple proxy servers for compatibility
- **Robust Error Handling**: Comprehensive error messages and recovery
- **Browser Support**: Works in modern browsers with HTML5 video
- **Stream Detection**: Automatic format detection and optimization

## Quick Start

1. **Open the Player**: Open `webplayer.html` in a modern web browser
2. **Add Playlist**: Click "Manage Playlists" to add M3U or Xtreme Codes sources
3. **Load Content**: Select a playlist and click "Load Playlist"
4. **Start Watching**: Click any channel to start streaming

## Playlist Support

### M3U Format
```
#EXTM3U
#EXTINF:-1 tvg-id="channel1" tvg-name="Channel Name" tvg-logo="logo.png" group-title="Group",Channel Name
http://example.com/stream.m3u8
```

### Xtreme Codes
- **Portal URL**: Your provider's server URL
- **Username**: Your account username  
- **Password**: Your account password
- Automatically generates M3U playlist from credentials

## Technical Architecture

### Core Components
- **HTML5 Video Player**: Native browser video element
- **HLS.js Library**: HTTP Live Streaming support
- **Tailwind CSS**: Utility-first styling framework
- **Local Storage**: Persistent settings and favorites

### Stream Processing
1. **URL Analysis**: Detect stream format (.m3u8, .ts, .mp4, etc.)
2. **Format Conversion**: Convert Xtreme Codes .ts to M3U8 when possible
3. **Playback Strategy**: Try HLS.js → Native HLS → Direct playback
4. **Error Recovery**: Proxy fallbacks and alternative methods

### Proxy Fallback System
- allorigins.win
- cors-anywhere.herokuapp.com  
- cors.eu.org
- api.codetabs.com
- crossorigin.me
- cors.bridged.cc
- yacdn.org

## Browser Compatibility

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ⚠️ Internet Explorer: Not supported

## Known Limitations

- Some Xtreme Codes providers may require native IPTV apps
- Geographic restrictions may apply to certain streams
- CORS limitations may affect some streaming sources
- .ts segments without proper M3U8 playlists have limited support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Update CHANGELOG.md
5. Update KNOWLEDGE.md if architectural changes
6. Submit a pull request

## License

This project is open source. Please ensure compliance with streaming content licenses and local regulations.

## Support

For issues, feature requests, or questions:
1. Check the debug panel for technical information
2. Review KNOWLEDGE.md for architectural understanding
3. Create an issue using the appropriate template
4. Include browser, OS, and stream details

---

**Version**: 2.0.0  
**Last Updated**: June 2025  
**Maintainer**: DynamicEndpoints
