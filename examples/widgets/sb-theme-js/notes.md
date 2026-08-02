# Theme JS — modal a11y

## Issues

| ID | Behavior in `modal-a11y.js` |
|----|------------------------------|
| #25 | On `shown.bs.modal`, focus moves to first focusable (or dialog) |
| #26 | Tab cycles inside open modal; Escape closes; focus returns to trigger |
| #48 | Sets `role="dialog"`, `aria-modal="true"`, `aria-labelledby` when title exists |

## Install

1. Create a **UI Script** (or paste into Theme JS Include content) named e.g. `SnowBoots Modal A11y`.
2. Paste `modal-a11y.js` (entire IIFE).
3. Lab Theme → **JS Includes** → add after jQuery / Bootstrap if listed.
4. `cache.do` and hard-refresh.

## Acceptance

- Open modal via button: focus is inside the dialog.
- Tab / Shift+Tab never leave the open modal.
- Escape closes modal; focus returns to the control that opened it.
- Inspect dialog: `role="dialog"` and `aria-modal="true"`.

## Limits

- Designed for Bootstrap 3.3.6 `.modal` + jQuery events.
- Without jQuery, a MutationObserver fallback watches `.modal.in` / `.modal.show` (best-effort).
- ServiceNow custom modals that are not `.modal` need widget-level focus management separately.
- Does not replace proper close-button `aria-label` markup in widget HTML.
