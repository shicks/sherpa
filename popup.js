// Wait for DOM to load
document.addEventListener('DOMContentLoaded', async () => {
  // Get the current tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  // Update page info
  updatePageInfo(tab);
  
  // Load appropriate buttons based on current page
  loadActionsForPage(tab);
});

/**
 * Update the page info section with current URL
 */
function updatePageInfo(tab) {
  const pageInfo = document.getElementById('current-page');
  
  if (!tab || !tab.url) {
    pageInfo.textContent = 'Unable to detect current page';
    return;
  }
  
  if (tab.url.includes('traillifeconnect.com')) {
    pageInfo.textContent = `On: ${getPageName(tab.url)}`;
  } else {
    pageInfo.textContent = 'Not on Trail Life Connect';
  }
}

/**
 * Extract a readable page name from URL
 */
function getPageName(url) {
  const urlObj = new URL(url);
  const path = urlObj.pathname;
  
  if (path === '/' || path === '') {
    return 'Home Page';
  }
  
  // Extract meaningful part of path
  const parts = path.split('/').filter(p => p);
  if (parts.length > 0) {
    return parts[parts.length - 1]
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
  return 'Trail Life Connect';
}

/**
 * Load action buttons based on the current page
 */
function loadActionsForPage(tab) {
  const actionsSection = document.getElementById('actions');
  
  if (!tab || !tab.url || !tab.url.includes('traillifeconnect.com')) {
    // Not on Trail Life Connect
    actionsSection.innerHTML = '<p class="placeholder">Navigate to a Trail Life Connect page to see available actions.</p>';
    return;
  }
  
  // Clear placeholder
  actionsSection.innerHTML = '';
  
  // Determine which buttons to show based on URL
  const buttons = getButtonsForPage(tab.url);
  
  if (buttons.length === 0) {
    actionsSection.innerHTML = '<p class="placeholder">No actions available for this page yet.</p>';
    return;
  }
  
  // Create buttons
  buttons.forEach(buttonConfig => {
    const button = document.createElement('button');
    button.textContent = buttonConfig.label;
    button.addEventListener('click', () => executeAction(tab.id, buttonConfig.action));
    actionsSection.appendChild(button);
  });
}

/**
 * Determine which buttons to show based on the current page URL
 */
function getButtonsForPage(url) {
  const buttons = [];
  
  // Example: Add buttons based on URL patterns
  // These are placeholders - actual functionality will be implemented later
  
  if (url.includes('/roster') || url.includes('/members')) {
    buttons.push({
      label: 'Export Roster',
      action: 'exportRoster'
    });
    buttons.push({
      label: 'Bulk Update',
      action: 'bulkUpdate'
    });
  }
  
  if (url.includes('/attendance')) {
    buttons.push({
      label: 'Mark All Present',
      action: 'markAllPresent'
    });
    buttons.push({
      label: 'Export Attendance',
      action: 'exportAttendance'
    });
  }
  
  if (url.includes('/calendar') || url.includes('/events')) {
    buttons.push({
      label: 'Export Calendar',
      action: 'exportCalendar'
    });
  }
  
  // Always show a general helper button on any Trail Life Connect page
  buttons.push({
    label: 'Show Helper Menu',
    action: 'showHelperMenu'
  });
  
  return buttons;
}

/**
 * Execute an action by sending a message to the content script
 */
async function executeAction(tabId, action) {
  try {
    await chrome.tabs.sendMessage(tabId, {
      type: 'EXECUTE_ACTION',
      action: action
    });
    
    // Optional: Close popup after action
    // window.close();
  } catch (error) {
    console.error('Error executing action:', error);
    alert(`Error: Unable to execute action. ${error.message || 'Please refresh the page and try again.'}`);
  }
}
