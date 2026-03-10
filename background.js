// Open side panel automatically when on Screener company pages
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" &&
      tab.url &&
      tab.url.includes("screener.in/company/")) {
    chrome.sidePanel.open({ tabId });
  }
});

// Listen for symbol messages from content.js
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.type === "SET_SYMBOL") {
    // Store so sidepanel.html can read it
    chrome.storage.session.set({ tvSymbol: message.symbol });
  }
});
