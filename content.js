const urlParts = window.location.pathname.split("/").filter(Boolean);
const ticker = urlParts[1] ? urlParts[1].toUpperCase() : "NIFTY";
const tvSymbol = `NSE:${ticker}`;

// Build TradingView embed URL
const params = new URLSearchParams({
  symbol: tvSymbol,
  interval: "D",
  theme: "light",
  style: "1",
  locale: "en",
  hide_top_toolbar: "0",
  save_image: "1",
});
params.append("studies", "RSI@tv-basicstudies");
params.append("studies", "StochasticRSI@tv-basicstudies");
params.append("studies", "MACD@tv-basicstudies");

const tvUrl = `https://www.tradingview.com/widgetembed/?${params.toString()}`;

// Build a nice wrapper card so it blends with Screener's design
const wrapper = document.createElement("div");
wrapper.id = "tv-screener-wrapper";
wrapper.style.cssText = `
  margin: 24px 0;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
`;

// Header bar matching Screener's section style
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

// The iframe itself
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

// ── PLACEMENT STRATEGY ──
// Try 1: Insert after Screener's own #chart section (most logical spot)
const screenerChart = document.getElementById("chart");

// Try 2: Before the #peers section
const peersSection = document.getElementById("peers");

// Try 3: Fallback — after h1
const titleEl = document.querySelector("h1");

if (screenerChart && screenerChart.parentElement) {
  screenerChart.parentElement.insertBefore(wrapper, screenerChart.nextSibling);
  console.log("[TV] Inserted after #chart");
} else if (peersSection && peersSection.parentElement) {
  peersSection.parentElement.insertBefore(wrapper, peersSection);
  console.log("[TV] Inserted before #peers");
} else if (titleEl && titleEl.parentElement) {
  titleEl.parentElement.insertBefore(wrapper, titleEl.nextSibling);
  console.log("[TV] Inserted after h1 (fallback)");
}
