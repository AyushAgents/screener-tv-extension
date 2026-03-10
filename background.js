let tvWindowId = null;

// ── ONE-TIME SETUP: Click icon to open split view ──
chrome.action.onClicked.addListener(async (tab) => {
  const data = await chrome.storage.session.get("tvSymbol");
  const symbol = data.tvSymbol || "NSE:NIFTY";

  await openSplitView(tab.windowId, symbol);
});

// ── AUTO-UPDATE: Every time content.js detects a new company ──
chrome.runtime.onMessage.addListener(async (message, sender) => {
  if (message.type !== "SET_SYMBOL") return;

  const symbol = message.symbol;

  // Always store latest symbol
  await chrome.storage.session.set({ tvSymbol: symbol });
  console.log("[TV] Symbol updated:", symbol);

  // If TV window is already open → auto-update it immediately, no click needed
  if (tvWindowId !== null) {
    await updateTvWindow(symbol);
  }
});

// ── Reset when TV window is closed ──
chrome.windows.onRemoved.addListener((windowId) => {
  if (windowId === tvWindowId) {
    tvWindowId = null;
    console.log("[TV] Window closed, reset.");
  }
});

// ── Helper: Open split view for first time ──
async function openSplitView(screenerWindowId, symbol) {
  const tvUrl = `https://www.tradingview.com/chart/?symbol=${symbol}`;
  const win = await chrome.windows.get(screenerWindowId);
  const half = Math.floor(win.width / 2);

  // Snap Screener to left
  await chrome.windows.update(screenerWindowId, {
    left: win.left, top: win.top,
    width: half, height: win.height,
    state: "normal"
  });

  // If TV window already open, just reposition and refocus
  if (tvWindowId !== null) {
    try {
      await chrome.windows.update(tvWindowId, {
        left: win.left + half, top: win.top,
        width: half, height: win.height,
        state: "normal"
      });
      await updateTvWindow(symbol);
      return;
    } catch (e) {
      tvWindowId = null; // window was closed, recreate below
    }
  }

  // Create fresh TV window on the right
  const tvWin = await chrome.windows.create({
    url: tvUrl,
    left: win.left + half, top: win.top,
    width: half, height: win.height,
    type: "normal",
    state: "normal"
  });
  tvWindowId = tvWin.id;
}

// ── Helper: Update symbol in existing TV window ──
async function updateTvWindow(symbol) {
  try {
    const tvUrl = `https://www.tradingview.com/chart/?symbol=${symbol}`;
    const [tvTab] = await chrome.tabs.query({ windowId: tvWindowId });
    if (tvTab) {
      await chrome.tabs.update(tvTab.id, { url: tvUrl });
      console.log("[TV] Auto-updated to:", symbol);
    }
  } catch (e) {
    tvWindowId = null;
  }
}
