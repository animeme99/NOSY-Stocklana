# Project Info

## Project Name

NOSY AI

## Short Description

NOSY turns activity from KOL wallets and top FOMO wallets on Solana into a research workspace: compare traders, inspect buys and sells, and explore token attention. Read-only, with a guided Sample demo and clear boundaries between live data and simulation.

## Full Description (Markdown)

## Follow the wallets. Read the evidence.

NOSY AI is a read-only Solana research workspace for people who want to understand the activity behind a token or a trader. It connects KOL wallet and top FOMO wallet profiles, observed buys and sells, token attention and research reports in one interface, guided by PEEP, our one-eyed mascot.

### The problem

A profitable screenshot rarely tells the whole story. Wallet activity is public, but useful context is scattered across explorers, profile pages and token dashboards. NOSY brings those views together so users can inspect the evidence behind the narrative.

### What you can explore

- **Traders:** search KOL wallets and top FOMO wallets, compare available reporting periods and inspect wallet details.
- **Tracker:** follow collected buying and selling observations and see participation around a token.
- **Signals:** explore observed buying groups. The Sample demonstrates a four-buyer trigger, a locked entry and subsequent price movement, including losses.
- **Trending:** explore token attention, flow and participation through several research views.
- **Token reports:** inspect supported tokens using the data available in the current index.
- **Stock-pair lens:** explore a tokenized-stock pairing concept in the Sample; a verified live registry is planned.

### How it works

NOSY combines a vanilla JavaScript interface on Cloudflare Pages with a Node.js read API, background collection and stored observations. Helius supplies Solana observations; FOMO and GMGN provide profile information or reported metrics for KOL wallets and top FOMO wallets; market sources add quote context. Deterministic analytics support the research views.

NOSY AI is the product name and character; we do not claim a trained prediction model or autonomous trading agent. The application does not custody funds, request wallet signing or submit trades.

### Try it

Live workspace: https://nosy.pages.dev/
Sample demo: https://nosy.pages.dev/showcase/
Public judging repository: https://github.com/animeme99/NOSY-Stocklana

No wallet connection is required. Start with Traders, use Next step to advance the Sample, then explore Tracker, Signals, Trending and a supported token report.

### What is live, simulated and next

Live views use collected public data and may be partial or delayed. The Sample combines a dated KOL wallet and top FOMO wallet snapshot with simulated market activity. Sample trades, signal multiples and stock pairs are illustrative, not live results or investment returns.

Complete historical cost basis, closed-position accounting, qualified mainnet signal history and verified live stock-pair coverage remain unfinished. Missing data stays unavailable rather than being presented as zero.

This public repository includes selected utility source, runnable tests, architecture notes and product assets. The full analytics, backend and provider integrations remain private, so it is not a full reproducible application checkout.

NOSY builds on earlier NOSY/PEEP iterations. This submission presents continued work on an existing product, not a claim that every component was created during the event.
