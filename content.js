(() => {
  const urlParts = window.location.pathname.split("/").filter(Boolean);
  const ticker = urlParts[1] ? urlParts[1].toUpperCase() : "NIFTY";
  chrome.runtime.sendMessage({ type: "SET_SYMBOL", symbol: `NSE:${ticker}` });
})();
