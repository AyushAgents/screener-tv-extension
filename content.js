(() => {
  const urlParts = window.location.pathname.split("/").filter(Boolean);
  const ticker = urlParts[1] ? urlParts[1].toUpperCase() : "NIFTY";
  const tvSymbol = `NSE:${ticker}`;

  // Send symbol to background → sidepanel picks it up
  chrome.runtime.sendMessage({ type: "SET_SYMBOL", symbol: tvSymbol });
  console.log("[TV] Symbol sent to side panel:", tvSymbol);
})();
