# GitHub Copilot Instructions for IPTV Web Player

## Project Context
This is a modern, single-file web-based IPTV player built with vanilla HTML/CSS/JavaScript. The main application file is `webplayer.html` which contains all functionality in a self-contained format.

## Key Architecture Points
- **Single-file application**: All HTML, CSS, and JavaScript in `webplayer.html`
- **No build process**: Direct browser execution, CDN dependencies
- **Modern JavaScript**: ES6+ features, async/await patterns
- **Tailwind CSS**: Utility-first styling via CDN
- **HLS.js integration**: Advanced video streaming capabilities

## Code Patterns & Standards

### JavaScript Style
```javascript
// Use modern async/await instead of promises
async function loadPlaylist() {
    try {
        const response = await fetchWithProxyFallback(url);
        // Handle success
    } catch (error) {
        showError(`Failed to load: ${error.message}`);
    }
}

// Consistent error handling pattern
function showError(message) {
    // Always provide user feedback
    // Log technical details to console
}
```

### UI Patterns
- Use Tailwind utility classes consistently
- Follow mobile-first responsive design
- Implement loading states for all async operations
- Provide clear user feedback for all actions

### State Management
- Central `appState` object for application state
- Use localStorage for persistent data (playlists, preferences)
- Event-driven updates for UI state changes

## Common Tasks & Approaches

### Adding New Features
1. **UI Components**: Add HTML in appropriate section, style with Tailwind
2. **Functionality**: Add JavaScript functions following existing patterns  
3. **State**: Update `appState` object if persistent data needed
4. **Error Handling**: Always include try/catch and user feedback

### Debugging & Troubleshooting
- Use the built-in debug panel (toggle in UI)
- Check browser console for detailed error logs
- Test with multiple proxy servers for CORS issues
- Validate stream URLs and playlist formats

### Video Playback Issues
1. **Primary approach**: Direct video.src assignment
2. **Fallback**: HLS.js for .m3u8 streams  
3. **CORS fallback**: Proxy servers with HLS.js
4. **Error handling**: Clear user messages + technical logging

## Xtreme Codes Specific
- **Authentication**: Portal URL + username/password
- **M3U Generation**: Dynamic playlist creation from API
- **Stream Processing**: Auto .ts to .m3u8 conversion
- **Error Messages**: Specific feedback for Xtreme Codes issues

## Testing Guidelines
- Test across Chrome, Firefox, Safari, Edge
- Verify mobile responsiveness
- Test with various playlist formats and sizes
- Check CORS handling with different stream sources

## Documentation Requirements
When making changes:
1. Update `CHANGELOG.md` with semantic versioning
2. Update `README.md` if user-facing features added
3. Update `KNOWLEDGE.md` for architectural changes
4. Add inline comments for complex logic

## Security Considerations
- Never store sensitive credentials in plain text beyond localStorage
- Use HTTPS when possible for stream URLs
- Be cautious with proxy server usage and user privacy
- Validate and sanitize user inputs

## Performance Guidelines
- Minimize DOM manipulations during playlist loading
- Use efficient event listeners (avoid repeated binding)
- Implement proper cleanup for HLS.js instances
- Consider memory usage with large playlists (1000+ channels)

## Browser Compatibility
- Target modern browsers with ES6+ support
- Test Picture-in-Picture on supported browsers
- Handle video format limitations gracefully
- Provide fallbacks for unsupported features

---

*Keep these instructions updated as the project evolves. Focus on maintainability and user experience.*
