# Analytics Event Reference

This document lists client-side analytics hooks available in the site.

## FAQ interactions

| Event Name | Trigger |
|------------|--------|
| `faq-open` | Fired when an element with `data-analytics="faq-question"` is clicked and its parent item opens. |
| `faq-close` | Fired when the same element closes the item. |

Events are queued in `window.analyticsEvents` for consumption by external analytics libraries. No network requests are made by default.

## SEO / Tracking tags

Analytics and verification tags are injected dynamically when the page loads if the following globals are set:

- `ENABLE_ANALYTICS` – must be `'true'` to enable injection.
- `GA_MEASUREMENT_ID` – Google Analytics measurement ID.
- `GSC_VERIFICATION` – Google Search Console verification token.

The injection logic resides in `script.js`.
