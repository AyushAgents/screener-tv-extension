// REPLACE THIS BLOCK:
const tvUrl = "https://www.tradingview.com/widgetembed/?" + [
  `symbol=${tvSymbol}`,
  "interval=D",
  "theme=light",
  "style=1",
  "locale=en",
  "hide_top_toolbar=0",
  "save_image=1",
  "studies=RSI@tv-basicstudies",
  "studies=StochasticRSI@tv-basicstudies",
  "studies=MACD@tv-basicstudies"
].join("&");

// WITH THIS:
const tvUrl = `https://www.tradingview.com/chart/?symbol=${tvSymbol}`;
