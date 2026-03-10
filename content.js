(() => {
  const urlParts = window.location.pathname.split("/").filter(Boolean);
  const ticker = urlParts[1] ? urlParts[1].toUpperCase() : "NIFTY";
  const tvSymbol = `NSE:${ticker}`;
  const tvUrl = `https://www.tradingview.com/chart/?symbol=${tvSymbol}`;

  const screenerChart = document.getElementById("chart");
  if (!screenerChart) {
    console.warn("[TV] #chart not found");
    return;
  }  // ← THIS CLOSING BRACE WAS MISSING

  const tabBar = document.createElement("div");
  tabBar.style.cssText = `display: flex; font-family: inherit;`;

  function makeTab(label, active) {
    const tab = document.createElement("button");
    tab.innerText = label;
    tab.style.cssText = `
      padding: 8px 20px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid #e0e0e0;
      background: ${active ? "#fff" : "#f4f4f4"};
      color: ${active ? "#1a73e8" : "#666"};
      border-bottom: ${active ? "2px solid #1a73e8" : "1px solid #e0e0e0"};
      transition: all 0.15s ease;
      outline: none;
    `;
    return tab;
  }

  const tabScreener = makeTab("📊 Screener Chart", true);
  const tabTV       = makeTab("📈 TradingView + Indicators", false);
  tabScreener.style.borderRadius = "8px 0 0 0";
  tabTV.style.borderRadius       = "0 8px 0 0";
  tabBar.appendChild(tabScreener);
  tabBar.appendChild(tabTV);

  const tvWrapper = document.createElement("div");
  tvWrapper.style.cssText = `
    display: none;
    border: 1px solid #e0e0e0;
    border-top: none;
    border-radius: 0 0 8px 8px;
    overflow: hidden;
  `;

  const iframe = document.createElement("iframe");
  iframe.id = "tv-screener-iframe";
  iframe.dataset.src = tvUrl;
  iframe.style.cssText = `
    width: 100%;
    height: 580px;
    border: none;
    display: block;
  `;
  tvWrapper.appendChild(iframe);

  const screenerWrapper = document.createElement("div");
  screenerWrapper.style.cssText = `
    border: 1px solid #e0e0e0;
    border-top: none;
    border-radius: 0 0 8px 8px;
    overflow: hidden;
  `;

  tabScreener.addEventListener("click", () => {
    screenerWrapper.style.display = "block";
    tvWrapper.style.display       = "none";
    tabScreener.style.background   = "#fff";
    tabScreener.style.color        = "#1a73e8";
    tabScreener.style.borderBottom = "2px solid #1a73e8";
    tabTV.style.background   = "#f4f4f4";
    tabTV.style.color        = "#666";
    tabTV.style.borderBottom = "1px solid #e0e0e0";
  });

  tabTV.addEventListener("click", () => {
    if (!iframe.src || iframe.src === window.location.href) {
      iframe.src = iframe.dataset.src;
    }
    tvWrapper.style.display       = "block";
    screenerWrapper.style.display = "none";
    tabTV.style.background   = "#fff";
    tabTV.style.color        = "#1a73e8";
    tabTV.style.borderBottom = "2px solid #1a73e8";
    tabScreener.style.background   = "#f4f4f4";
    tabScreener.style.color        = "#666";
    tabScreener.style.borderBottom = "1px solid #e0e0e0";
  });

  const container = document.createElement("div");
  container.style.cssText = `margin: 16px 0 24px 0; border-radius: 8px;`;
  container.appendChild(tabBar);
  container.appendChild(screenerWrapper);
  container.appendChild(tvWrapper);

  screenerChart.parentElement.insertBefore(container, screenerChart);
  screenerWrapper.appendChild(screenerChart);
})();
