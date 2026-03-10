# Screener + TradingView Chrome Extension

A personal Chrome extension that brings TradingView charts (with your 
indicators) directly into Screener.in company pages — as a seamless 
toggle tab alongside Screener's existing chart.

---

## What it does

When you open any company page on Screener.in (e.g. `/company/RELIANCE/`),
the extension injects a two-tab chart toggle:

- **📊 Screener Chart** — Screener's original chart, untouched
- **📈 TradingView + Indicators** — Full TradingView chart for the same 
  NSE symbol, with all your saved indicators (RSI, StochRSI, MACD, etc.)

Switching tabs is instant. TradingView loads lazily — only when you 
click the tab.

---

## Screenshots

> Add screenshots here after setup

---

## Installation (Developer Mode — no Chrome Web Store)

This extension is not published on the Chrome Web Store.  
Install it manually in Developer Mode:

1. Download the repository as ZIP : https://github.com/AyushAgents/screener-tv-extension (Click on the Green <> Code button)
2. Open Chrome and go to `chrome://extensions`
3. Enable **Developer mode** (toggle, top-right)
4. Click **Load unpacked** and select the `screener-tv-extension` folder
5. Open any Screener company page: `https://www.screener.in/company/RELIANCE/`
6. The **📊 Screener / 📈 TradingView** toggle will appear below the company header

## Requirements

- Google Chrome (version 109+ for Manifest V3)
- TradingView account — you must be prior logged in. Also to load indicators it will ask you (THIS IS IMPORTANT)
- Screener.in account (free tier works)

## File Structure
screener-tv-extension/
1 manifest.json — Extension config (Manifest V3)
2 rules.json — Strips X-Frame-Options headers from TradingView
3 background.js — Service worker (minimal)
4 content.js — Injects chart toggle UI into Screener pages


## How it works

**Header stripping (`rules.json`):** TradingView sets `X-Frame-Options: DENY` on all its pages, which normally blocks them from loading inside iframes. The extension uses Chrome's `declarativeNetRequest` API to remove these headers locally before Chrome reads them. This only affects your browser and only applies to `tradingview.com` URLs.

**Symbol detection (`content.js`):** The extension reads the ticker from the Screener URL (e.g. `/company/RELIANCE/` → `NSE:RELIANCE`) and uses it to load the correct chart.

**Lazy loading:** The TradingView iframe only loads when you click the TradingView tab — no unnecessary network requests on every page load.

## Limitations

- **NSE only (currently)** — BSE-only stocks, indices, and F&O contracts may not map correctly
- **Login required** — If the chart is blank, check you are logged into TradingView in Chrome
- **Your saved layout loads** — The chart opens with whatever TradingView layout you last saved; there is no way to force specific indicators via URL alone
- **Screener DOM dependency** — If Screener updates their page structure the `#chart` selector may need updating

## Customisation

**Change iframe height:** In `content.js` find `height: 580px` and change to your preference.

**Add BSE support:** In `content.js` replace `NSE:${ticker}` with a mapping object that handles BSE-only stocks.

**Change indicators:** Log into TradingView, set up your chart with RSI/MACD/etc., save the layout. The extension loads your last saved layout automatically.

## Roadmap

- [ ] BSE symbol fallback when NSE symbol not found
- [ ] Timeframe switcher buttons (1D / 1W / 1M) above the TradingView chart
- [ ] Auto-detect exchange from Screener page metadata
- [ ] Dark mode matching Screener's theme
- [ ] Remember last active tab per session

## License

MIT — see `LICENSE` file.

