# Public judging scope

This is a fresh, selective export for the Stocklana submission. It does not contain the private application's Git history.

## Included

- Product README, Project Info and a judge's walkthrough.
- A high-level architecture description and honest feature/data limitations.
- Existing NOSY cover, five application captures and four PEEP brand images.
- Unmodified copies of `src/identity.cjs` and `src/format.cjs` from the product checkout at export time.
- New focused tests for those modules and an integrity checker for the public kit.

## Excluded

- Proprietary research, ranking, signal, valuation and accounting implementations.
- Provider adapters, data-collection workers and complete application bundles.
- Backend/API implementation, infrastructure details and deployment tooling.
- Provider credentials, environment files, signing material and local caches.
- Raw wallet datasets, operational logs and internal plans or workflow tools.
- Private repository history and uncommitted product changes outside the two selected utilities.

The public helper tests are not the full application's test suite. The kit has no `start` or `build` command because the full runtime is intentionally absent. Use the hosted application for the product demonstration.

## Provenance and reuse

Source module and asset hashes are recorded in [the integrity manifest](../submission/manifest.json). The manifest identifies the exported bytes without exposing private paths or deployment details.

Public visibility is provided for review. This repository does not grant a general open-source license to the complete NOSY product or its branding. Third-party names, logos and profile images visible in product captures remain associated with their respective owners and do not imply endorsement.
