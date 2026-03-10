// Read ?symbol=NSE:RELIANCE passed from content.js
const params = new URLSearchParams(location.search);
const symbol = params.get("symbol") || "NSE:NIFTY";

new TradingView.widget({
  container_id: "tv-container",
  symbol: symbol,
  interval: "D",
  autosize: true,
  theme: "light",
  style: "1",
  locale: "en",
  hide_top_toolbar: false,
  studies: [
    { id: "RSI@tv-basicstudies" },
    { id: "StochasticRSI@tv-basicstudies" },
    { id: "MACD@tv-basicstudies" }
  ]
});
