chrome.action.onClicked.addListener(async (tab) => {
  const data = await chrome.storage.session.get("tvSymbol");
  const symbol = data.tvSymbol || "NSE:NIFTY";
  const tvUrl = `https://www.tradingview.com/chart/?symbol=${symbol}`;

  // Snap Screener to left half (assumes 1920px wide screen — adjust if needed)
  const W = 1920;
  const H = 1080;
  const half = Math.floor(W / 2);

  await chrome.windows.update(tab.windowId, {
    left: 0, top: 0,
    width: half, height: H,
    state: "normal"
  });

  await chrome.windows.create({
    url: tvUrl,
    left: half, top: 0,
    width: half, height: H,
    state: "normal"
  });
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "SET_SYMBOL") {
    chrome.storage.session.set({ tvSymbol: message.symbol });
  }
});
