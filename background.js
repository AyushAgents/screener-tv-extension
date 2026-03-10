// Open side panel when extension icon is clicked
chrome.action.onClicked.addListener((tab) => {
  chrome.sidePanel.open({ tabId: tab.id });
});

// Listen for symbol from content.js and store it
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.type === "SET_SYMBOL") {
    chrome.storage.session.set({ tvSymbol: message.symbol });
    console.log("[TV Background] Symbol stored:", message.symbol);
  }
});
