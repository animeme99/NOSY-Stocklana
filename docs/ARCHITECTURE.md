# Architecture overview

NOSY is a read-only Solana research application. This document describes its broad architecture; the public kit includes only the two utility modules listed in the README.

| Layer | Responsibility |
| --- | --- |
| Browser workspace | Traders, Tracker, Signals, Trending and supported-token reports. Vanilla JavaScript and DOM rendering. |
| Read API | Serves available wallet, token and activity observations to the interface. |
| Collection | Retrieves public wallet/profile information, Solana transaction observations and quote context. |
| Storage | Retains observations and snapshots; Node's native SQLite support serves selected backend tasks. |
| Analysis | Derives research views from available evidence. Financial completeness is a separate qualification requirement. |
| Sample | An isolated, authored scenario demonstrates interaction and analysis with simulated market activity and a dated public trader snapshot. |

The hosted browser uses Cloudflare Pages. A Node backend provides the read API and collection runtime. Provider access and operational configuration stay on the backend.

## Data sources

- **Helius / Solana:** transaction and asset observations.
- **FOMO:** public wallet identities and reported profile/leaderboard information.
- **GMGN:** provider-reported wallet statistics for available periods.
- **Dexscreener / GeckoTerminal:** market and quote context in the implemented collection paths.

Provider coverage, timestamps and data availability matter. A displayed observation is not automatically a verified trade, complete cost basis or executable price.

## Live and Sample

Live views use collected data and may be partial, delayed or empty. The Sample advances through a fixed scenario and keeps its simulated market activity separate from live observations. Public trader snapshots in the Sample retain their date; they are not continuously refreshed live profiles.

The locked-entry signal and outcome workflow is demonstrated in the Sample. Fully qualified mainnet signal history and complete closed-position accounting remain incomplete. See [data limits](DATA-AND-LIMITATIONS.md).

## Public boundary

This kit deliberately excludes analysis implementations, collector/adaptor code, deployment scripts, raw datasets and the complete browser bundle. The generic source examples demonstrate input normalization and display formatting only. The hosted interface is the review surface for the full experience.
