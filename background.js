/**
 * Background service worker for Sherpa extension
 * Handles background tasks and communication between popup and content scripts
 */

// Listen for installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('Sherpa extension installed');
    // Could open a welcome page or show notification
  } else if (details.reason === 'update') {
    console.log('Sherpa extension updated');
  }
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Background received message:', message);
  
  // Handle different message types
  switch (message.type) {
    case 'GET_CURRENT_TAB':
      getCurrentTab().then(sendResponse);
      return true; // Keep channel open for async response
      
    case 'LOG':
      console.log('From content script:', message.data);
      sendResponse({ success: true });
      break;
      
    default:
      console.log('Unknown message type:', message.type);
  }
  
  return false;
});

/**
 * Get the currently active tab
 */
async function getCurrentTab() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs[0] || null;
}

/**
 * Execute a script in a specific tab
 */
async function executeScriptInTab(tabId, func, args = []) {
  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: func,
      args: args
    });
    return results[0]?.result;
  } catch (error) {
    console.error('Error executing script:', error);
    return null;
  }
}

// Log when the service worker starts
console.log('Sherpa background service worker started');
