/**
 * Content script for Trail Life Connect pages
 * This script runs on all traillifeconnect.com pages and can:
 * - Add buttons to page elements
 * - Manipulate the DOM
 * - Respond to messages from the popup
 */

console.log('Sherpa extension loaded on Trail Life Connect');

// Initialize the extension
initializeExtension();

/**
 * Initialize the extension and add buttons to the page
 */
function initializeExtension() {
  // Wait for page to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addButtonsToPage);
  } else {
    addButtonsToPage();
  }
}

/**
 * Add custom buttons to the page based on the current URL
 */
function addButtonsToPage() {
  const url = window.location.href;
  
  // Add buttons based on the page type
  if (url.includes('/roster') || url.includes('/members')) {
    addRosterButtons();
  }
  
  if (url.includes('/attendance')) {
    addAttendanceButtons();
  }
  
  if (url.includes('/calendar') || url.includes('/events')) {
    addCalendarButtons();
  }
  
  // Add a general Sherpa helper button to the page
  addGeneralHelperButton();
}

/**
 * Add buttons specific to roster/members pages
 */
function addRosterButtons() {
  // Find a suitable location to add buttons (this is a placeholder)
  // Actual implementation will depend on the page structure
  const container = findOrCreateButtonContainer('roster');
  
  if (container) {
    const exportButton = createButton('Export Roster', () => {
      handleAction('exportRoster');
    });
    container.appendChild(exportButton);
    
    const bulkUpdateButton = createButton('Bulk Update', () => {
      handleAction('bulkUpdate');
    });
    container.appendChild(bulkUpdateButton);
  }
}

/**
 * Add buttons specific to attendance pages
 */
function addAttendanceButtons() {
  const container = findOrCreateButtonContainer('attendance');
  
  if (container) {
    const markAllButton = createButton('Mark All Present', () => {
      handleAction('markAllPresent');
    });
    container.appendChild(markAllButton);
    
    const exportButton = createButton('Export Attendance', () => {
      handleAction('exportAttendance');
    });
    container.appendChild(exportButton);
  }
}

/**
 * Add buttons specific to calendar/events pages
 */
function addCalendarButtons() {
  const container = findOrCreateButtonContainer('calendar');
  
  if (container) {
    const exportButton = createButton('Export Calendar', () => {
      handleAction('exportCalendar');
    });
    container.appendChild(exportButton);
  }
}

/**
 * Add a general helper button that's visible on all pages
 */
function addGeneralHelperButton() {
  // Create a floating button in the bottom-right corner
  const floatingButton = document.createElement('div');
  floatingButton.id = 'sherpa-floating-button';
  floatingButton.className = 'sherpa-floating-btn';
  floatingButton.innerHTML = '🎒'; // Backpack emoji as a sherpa icon
  floatingButton.title = 'Sherpa Helper';
  
  floatingButton.addEventListener('click', () => {
    handleAction('showHelperMenu');
  });
  
  document.body.appendChild(floatingButton);
}

/**
 * Find or create a container for Sherpa buttons on the page
 */
function findOrCreateButtonContainer(pageType) {
  // Check if container already exists
  let container = document.getElementById(`sherpa-buttons-${pageType}`);
  
  if (container) {
    return container;
  }
  
  // Create new container
  container = document.createElement('div');
  container.id = `sherpa-buttons-${pageType}`;
  container.className = 'sherpa-button-container';
  
  // Try to find a suitable place to insert the container
  // This is a generic approach - may need customization based on actual page structure
  const possibleParents = [
    document.querySelector('header'),
    document.querySelector('.page-header'),
    document.querySelector('.toolbar'),
    document.querySelector('nav'),
    document.querySelector('main'),
    document.body
  ];
  
  for (const parent of possibleParents) {
    if (parent) {
      parent.insertBefore(container, parent.firstChild);
      return container;
    }
  }
  
  return null;
}

/**
 * Create a styled button element
 */
function createButton(text, onClick) {
  const button = document.createElement('button');
  button.className = 'sherpa-button';
  button.textContent = text;
  button.addEventListener('click', onClick);
  return button;
}

/**
 * Handle button action
 */
function handleAction(action) {
  console.log(`Executing action: ${action}`);
  
  switch (action) {
    case 'exportRoster':
      exportRoster();
      break;
    case 'bulkUpdate':
      bulkUpdate();
      break;
    case 'markAllPresent':
      markAllPresent();
      break;
    case 'exportAttendance':
      exportAttendance();
      break;
    case 'exportCalendar':
      exportCalendar();
      break;
    case 'showHelperMenu':
      showHelperMenu();
      break;
    default:
      console.log(`Unknown action: ${action}`);
      alert(`Action "${action}" is not yet implemented.`);
  }
}

/**
 * Action implementations (placeholders for now)
 */

function exportRoster() {
  alert('Export Roster functionality will be implemented here.\n\nThis will extract roster data from the page and download it as a file.');
}

function bulkUpdate() {
  alert('Bulk Update functionality will be implemented here.\n\nThis will allow updating multiple members at once.');
}

function markAllPresent() {
  alert('Mark All Present functionality will be implemented here.\n\nThis will automatically check all attendance boxes.');
}

function exportAttendance() {
  alert('Export Attendance functionality will be implemented here.\n\nThis will extract attendance data and download it.');
}

function exportCalendar() {
  alert('Export Calendar functionality will be implemented here.\n\nThis will export calendar events to a file format like ICS.');
}

function showHelperMenu() {
  alert('Sherpa Helper Menu\n\nThis menu will show all available actions for the current page.\n\nClick the Sherpa icon in the toolbar to access actions.');
}

/**
 * Listen for messages from popup or background script
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'EXECUTE_ACTION') {
    handleAction(message.action);
    sendResponse({ success: true });
  }
  return true;
});
