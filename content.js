// Step 1: Get ticker from Screener URL e.g. /company/RELIANCE/
const urlParts = window.location.pathname.split("/").filter(Boolean);
const ticker = urlParts[1] ? urlParts[1].toUpperCase() : "NIFTY";
const tvSymbol = `NSE:${ticker}`;

// Step 2: Build TradingView's own embed URL with your indicators
const studies = [
  "RSI@tv-basicstudies",
  "StochasticRSI@tv-basicstudies",
  "MACD@tv-basicstudies"
].join("|");

const tvUrl =
  `https://www.tradingview.com/widgetembed/?` +
  `symbol=${encodeURIComponent(tvSymbol)}` +
  `&interval=D` +
  `&theme=light` +
  `&style=1` +
  `&studies=${encodeURIComponent(studies)}` +
  `&locale=en` +
  `&hide_top_toolbar=0` +
  `&save_image=1`;

// Step 3: Create iframe pointing directly to TradingView
const iframe = document.createElement("iframe");
iframe.src = tvUrl;
iframe.style.cssText = `
  width: 100%;
  height: 500px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-top: 20px;
  display: block;
`;

// Step 4: Insert below the company heading
const titleEl = document.querySelector("h1");
if (titleEl && titleEl.parentElement) {
  titleEl.parentElement.insertBefore(iframe, titleEl.nextSibling);
}
