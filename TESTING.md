# Testing Guide for Sherpa Extension

This guide helps you test the Sherpa Chrome extension during development.

## Prerequisites

- Google Chrome browser
- Sherpa extension files (this repository)

## Installation for Testing

1. **Open Chrome Extensions Page**
   ```
   chrome://extensions/
   ```
   Or: Menu (⋮) → Extensions → Manage Extensions

2. **Enable Developer Mode**
   - Toggle "Developer mode" in the top-right corner

3. **Load the Extension**
   - Click "Load unpacked"
   - Navigate to the sherpa directory
   - Select the folder containing `manifest.json`

4. **Verify Installation**
   - You should see "Sherpa - Trail Life Connect Helper" in the list
   - Extension should be enabled
   - Pin to toolbar for easy access

## Testing Checklist

### ✓ Extension Loads Successfully
- [ ] Extension appears in chrome://extensions/
- [ ] No errors shown on the extension card
- [ ] Extension icon appears in toolbar (after pinning)

### ✓ Popup Interface
- [ ] Click the extension icon
- [ ] Popup opens with correct styling
- [ ] Shows "Sherpa" header and version
- [ ] Shows current page info

#### Test on Non-Trail Life Connect Page
- [ ] Navigate to any non-TLC page (e.g., google.com)
- [ ] Click extension icon
- [ ] Should show: "Not on Trail Life Connect"
- [ ] Should show placeholder text about navigating to TLC

#### Test on Trail Life Connect
- [ ] Navigate to https://www.traillifeconnect.com/
- [ ] Click extension icon
- [ ] Should show current page name
- [ ] Should show "Show Helper Menu" button
- [ ] Clicking button should show alert (placeholder functionality)

### ✓ Content Script
**Note:** Content script only runs on https://www.traillifeconnect.com/*

#### Test on Trail Life Connect Homepage
- [ ] Navigate to https://www.traillifeconnect.com/
- [ ] Open browser console (F12 → Console)
- [ ] Should see: "Sherpa extension loaded on Trail Life Connect"
- [ ] Floating button (🎒) appears in bottom-right
- [ ] Clicking floating button shows alert

#### Test on Roster/Members Pages
If available on TLC:
- [ ] Navigate to roster or members page
- [ ] Button container should appear near top of page
- [ ] Should show "Export Roster" and "Bulk Update" buttons
- [ ] Clicking buttons shows placeholder alerts

#### Test on Attendance Pages
If available on TLC:
- [ ] Navigate to attendance page
- [ ] Should show "Mark All Present" and "Export Attendance" buttons
- [ ] Clicking buttons shows placeholder alerts

#### Test on Calendar/Events Pages
If available on TLC:
- [ ] Navigate to calendar or events page
- [ ] Should show "Export Calendar" button
- [ ] Clicking button shows placeholder alert

### ✓ Background Service Worker
- [ ] Open chrome://extensions/
- [ ] Click "Service worker" link under Sherpa extension
- [ ] Should open DevTools with no errors
- [ ] Console should show: "Sherpa background service worker started"

### ✓ Styling and UI
- [ ] Popup has proper styling (blue theme, rounded corners)
- [ ] Buttons have hover effects
- [ ] Floating button is visible and styled correctly
- [ ] Injected buttons match the design (blue, rounded)
- [ ] All text is readable and properly formatted

### ✓ Error Handling
- [ ] Test clicking popup buttons on non-TLC pages
- [ ] Should show error alert about needing to refresh
- [ ] No console errors that break functionality

## Manual Testing Workflow

1. **Make code changes**
2. **Reload extension**
   - Go to chrome://extensions/
   - Click refresh icon (🔄) on Sherpa card
3. **Refresh any open Trail Life Connect tabs**
4. **Test the changed functionality**
5. **Check console for errors** (F12 → Console)

## Common Issues

### Extension Not Loading
- Check that manifest.json is valid JSON
- Ensure all referenced files exist
- Check for syntax errors in JS files

### Content Script Not Running
- Content scripts only run on https://www.traillifeconnect.com/*
- Make sure you're on the correct domain
- Try refreshing the page after loading the extension

### Popup Not Opening
- Check browser console for errors
- Ensure popup.html, popup.js, and popup.css exist
- Verify manifest.json references correct files

### Icons Not Showing
- Ensure icons directory and PNG files exist
- Check icon paths in manifest.json
- Try reloading the extension

## Testing with Browser DevTools

### Content Script Debugging
1. Open Trail Life Connect page
2. Press F12 to open DevTools
3. Go to Console tab
4. Content script logs appear here
5. Use Sources tab to debug content.js

### Popup Debugging
1. Right-click extension icon
2. Select "Inspect popup"
3. DevTools opens for popup window
4. Debug popup.js, view console logs

### Background Script Debugging
1. Go to chrome://extensions/
2. Click "Service worker" under Sherpa
3. DevTools opens for background script
4. View logs, debug background.js

## Security Testing

- [ ] Extension only requests necessary permissions
- [ ] Only runs on Trail Life Connect domain
- [ ] No external data transmission
- [ ] No sensitive data stored

## Accessibility Testing

- [ ] All buttons are keyboard accessible
- [ ] Color contrast is sufficient
- [ ] Text is readable at different zoom levels
- [ ] Extension icon has proper alt text

## Performance Testing

- [ ] Extension loads quickly
- [ ] No noticeable page slowdown
- [ ] Minimal memory usage
- [ ] Content script doesn't interfere with page functionality

## Next Steps

After verifying the extension shell works correctly:

1. Implement actual functionality for each action
2. Add data extraction logic
3. Implement export features
4. Add user settings/preferences
5. Prepare for Chrome Web Store submission

## Reporting Issues

When reporting issues, include:
- Chrome version
- Extension version
- Current page URL
- Steps to reproduce
- Console error messages
- Screenshots if applicable
