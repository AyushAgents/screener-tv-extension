const urlParts = window.location.pathname.split("/").filter(Boolean);
const ticker = urlParts[1] ? urlParts[1].toUpperCase() : "NIFTY";
const tvSymbol = `NSE:${ticker}`;  // Keep colon literal — do NOT encode

// Build URL manually — widgetembed needs literal : and @ characters
const tvUrl = "https://www.tradingview.com/widgetembed/?" + [
  `symbol=${tvSymbol}`,           // NSE:RELIANCE — literal colon
  "interval=D",
  "theme=light",
  "style=1",
  "locale=en",
  "hide_top_toolbar=0",
  "save_image=1",
  "studies=RSI@tv-basicstudies",              // literal @ — not %40
  "studies=StochasticRSI@tv-basicstudies",
  "studies=MACD@tv-basicstudies"
].join("&");

console.log("[TV] Loading:", tvUrl);

// Wrapper card
const wrapper = document.createElement("div");
wrapper.id = "tv-screener-wrapper";
wrapper.style.cssText = `
  margin: 24px 0;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
`;

const header = document.createElement("div");
header.style.cssText = `
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  color: #444;
  background: #f7f7f7;
  border-bottom: 1px solid #e8e8e8;
`;
header.innerText = `TradingView Chart — ${ticker}`;

const iframe = document.createElement("iframe");
iframe.src = tvUrl;
iframe.id = "tv-screener-iframe";
iframe.style.cssText = `
  width: 100%;
  height: 520px;
  border: none;
  display: block;
`;

wrapper.appendChild(header);
wrapper.appendChild(iframe);

// Placement: after Screener's own chart section
const screenerChart = document.getElementById("chart");
const peersSection  = document.getElementById("peers");
const titleEl       = document.querySelector("h1");

if (screenerChart && screenerChart.parentElement) {
  screenerChart.parentElement.insertBefore(wrapper, screenerChart.nextSibling);
} else if (peersSection && peersSection.parentElement) {
  peersSection.parentElement.insertBefore(wrapper, peersSection);
} else if (titleEl && titleEl.parentElement) {
  titleEl.parentElement.insertBefore(wrapper, titleEl.nextSibling);
}
