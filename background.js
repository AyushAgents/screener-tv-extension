chrome.action.onClicked.addListener(async (tab) => {
  const data = await chrome.storage.session.get("tvSymbol");
  const symbol = data.tvSymbol || "NSE:NIFTY";
  const tvUrl = `https://www.tradingview.com/chart/?symbol=${symbol}`;

  // Get current window's actual dimensions — no hardcoding
  const currentWindow = await chrome.windows.get(tab.windowId);

  const left   = currentWindow.left;
  const top    = currentWindow.top;
  const width  = currentWindow.width;
  const height = currentWindow.height;
  const half   = Math.floor(width / 2);

  // Snap Screener to left half of current window space
  await chrome.windows.update(tab.windowId, {
    left:   left,
    top:    top,
    width:  half,
    height: height,
    state:  "normal"
  });

  // Open TradingView in right half
  await chrome.windows.create({
    url:    tvUrl,
    left:   left + half,
    top:    top,
    width:  half,
    height: height,
    state:  "normal"
  });
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "SET_SYMBOL") {
    chrome.storage.session.set({ tvSymbol: message.symbol });
  }
});
