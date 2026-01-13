# Sherpa - Trail Life Connect Helper

Sherpa is a Chrome extension that helps automate and streamline tasks on Trail Life Connect (https://www.traillifeconnect.com/).

## Features

- **Smart UI Integration**: Adds helpful action buttons directly to Trail Life Connect pages
- **Popup Interface**: Quick access to page-specific actions via the extension icon
- **Floating Helper Button**: Always-visible helper button (🎒) on all Trail Life Connect pages
- **Page-Specific Actions**: Different buttons and actions based on the current page:
  - **Roster/Members Pages**: Export roster, bulk updates
  - **Attendance Pages**: Mark all present, export attendance
  - **Calendar/Events Pages**: Export calendar
  - **General**: Helper menu with all available actions

## Installation

### Option 1: Install from Chrome Web Store (Coming Soon)
The extension will be available on the Chrome Web Store once published.

### Option 2: Install Unpacked (Development Mode)

1. **Download or Clone the Repository**
   ```bash
   git clone https://github.com/shicks/sherpa.git
   cd sherpa
   ```

2. **Open Chrome Extensions Page**
   - Open Chrome browser
   - Navigate to `chrome://extensions/`
   - Or: Menu (⋮) → Extensions → Manage Extensions

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner

4. **Load the Extension**
   - Click "Load unpacked"
   - Navigate to the sherpa directory
   - Select the folder (the one containing `manifest.json`)
   - Click "Select Folder" or "Open"

5. **Verify Installation**
   - You should see the Sherpa extension card with the icon
   - The extension should be enabled by default
   - Pin the extension icon to your toolbar for easy access

## Usage

### Using the Popup Interface

1. **Navigate to Trail Life Connect**
   - Go to https://www.traillifeconnect.com/
   
2. **Click the Sherpa Icon**
   - Click the Sherpa extension icon in your Chrome toolbar
   - The popup will show available actions for the current page

3. **Execute Actions**
   - Click any button in the popup to execute that action
   - Actions will be performed on the current page

### Using In-Page Buttons

1. **Automatic Button Injection**
   - When you visit Trail Life Connect pages, Sherpa automatically adds helper buttons
   - Look for blue "Sherpa" buttons at the top of supported pages

2. **Floating Helper Button**
   - A floating button (🎒) appears in the bottom-right corner of all Trail Life Connect pages
   - Click it to access the helper menu

## Development

### Project Structure

```
sherpa/
├── manifest.json       # Extension configuration
├── popup.html          # Popup UI structure
├── popup.css           # Popup styles
├── popup.js            # Popup logic
├── content.js          # Content script (runs on TLC pages)
├── content.css         # Styles for injected elements
├── background.js       # Background service worker
├── icons/              # Extension icons
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README.md           # This file
```

### Key Components

- **manifest.json**: Defines extension metadata, permissions, and components
- **Content Script** (content.js): Runs on Trail Life Connect pages to inject buttons and manipulate the DOM
- **Popup** (popup.html/js/css): UI shown when clicking the extension icon
- **Background Script** (background.js): Handles background tasks and message passing
- **Icons**: Various sizes for different contexts (toolbar, extensions page, etc.)

### Adding New Actions

To add a new action:

1. **Add button configuration in popup.js** (`getButtonsForPage` function)
2. **Implement the action handler in content.js** (`handleAction` function)
3. **Add page-specific button in content.js** (e.g., `addRosterButtons`)

### Testing

1. Make changes to the code
2. Go to `chrome://extensions/`
3. Click the refresh icon (🔄) on the Sherpa extension card
4. Test the changes on Trail Life Connect pages

## Permissions

The extension requires the following permissions:

- **activeTab**: To interact with the currently active tab
- **scripting**: To inject content scripts and execute actions
- **host_permissions**: Access to `https://www.traillifeconnect.com/*`

## Privacy

- Sherpa only runs on Trail Life Connect pages
- No data is collected or transmitted to external servers
- All processing happens locally in your browser

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

This project is open source. See the LICENSE file for details.

## Support

For issues or questions, please open an issue on the GitHub repository.

## Roadmap

Future enhancements may include:

- [ ] Implement actual data export functionality
- [ ] Add bulk update capabilities
- [ ] Integrate with Trail Life Connect API (if available)
- [ ] Add settings/configuration options
- [ ] Support for additional page types
- [ ] Keyboard shortcuts
- [ ] Dark mode support

## Version History

### 1.0.0 (Current)
- Initial release
- Basic extension shell
- Popup interface
- Content script with button injection
- Support for roster, attendance, and calendar pages
