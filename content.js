// Step 1: Read company name from page title (e.g. "Reliance Industries Ltd.")
const titleEl = document.querySelector("h1");
const rawText  = titleEl ? titleEl.innerText.trim() : "";

// Step 2: Screener URL itself contains the ticker e.g. /company/RELIANCE/
// This is more reliable than parsing the h1 text
const urlParts = window.location.pathname.split("/").filter(Boolean);
// URL is /company/RELIANCE/ → parts: ["company", "RELIANCE"]
const tickerFromUrl = urlParts[1] ? urlParts[1].toUpperCase() : "NIFTY";

// Step 3: Build TradingView symbol (NSE first, simplest start)
const tvSymbol = `NSE:${tickerFromUrl}`;

// Step 4: Create the iframe pointing to tv-panel.html
const iframe = document.createElement("iframe");
iframe.src    = chrome.runtime.getURL(`tv-panel.html?symbol=${encodeURIComponent(tvSymbol)}`);
iframe.style.cssText = `
  width: 100%;
  height: 500px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-top: 20px;
  display: block;
`;

// Step 5: Insert below the h1 heading on the Screener page
if (titleEl && titleEl.parentElement) {
  titleEl.parentElement.insertBefore(iframe, titleEl.nextSibling);
}
