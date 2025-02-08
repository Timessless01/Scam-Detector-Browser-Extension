// Keep service worker alive
chrome.alarms.create('keep-alive', { periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'keep-alive') {
    console.log('Service worker active');
  }
});

// Replace with your Google Safe Browsing API key
const API_KEY = 'AIzaSyAYd3nGf4SYtXJXGcDyNo2EVpoGJE9kQSo';

// Check URL safety (only allow HTTP/HTTPS URLs)
async function checkUrlSafety(url) {
  try {
    // Validate URL format
    if (!url || !url.startsWith('http')) {
      console.warn('Skipping non-HTTP URL:', url || 'undefined');
      return false;
    }

    // API request setup
    const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${API_KEY}`;
    const requestBody = {
      client: { clientId: 'scam-detector', clientVersion: '1.0' },
      threatInfo: {
        threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING'],
        platformTypes: ['ANY_PLATFORM'],
        threatEntryTypes: ['URL'],
        threatEntries: [{ url: encodeURI(url) }]
      }
    };

    // Send API request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    // Handle response
    const data = await response.json();
    return data.matches ? true : false;

  } catch (error) {
    console.error('API Error:', error);
    return false;
  }
}

// Listen for URL changes in tabs
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  // Only process if URL changes and is valid
  if (changeInfo.url && tab.url?.startsWith('http')) {
    console.log("Checking URL:", changeInfo.url);
    const isUnsafe = await checkUrlSafety(changeInfo.url);
    
    if (isUnsafe) {
      chrome.scripting.executeScript({
        target: { tabId },
        func: (message) => alert(`⚠️ ${message}`),
        args: ['This site is flagged as unsafe!']
      });
    }
  }
});

// Listen for tab switches (edge cases)
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  
  // Validate tab URL
  if (tab?.url?.startsWith('http')) {
    console.log("Checking URL (activated tab):", tab.url);
    const isUnsafe = await checkUrlSafety(tab.url);
    
    if (isUnsafe) {
      chrome.scripting.executeScript({
        target: { tabId: activeInfo.tabId },
        func: (message) => alert(`⚠️ ${message}`),
        args: ['This site is flagged as unsafe!']
      });
    }
  }
});