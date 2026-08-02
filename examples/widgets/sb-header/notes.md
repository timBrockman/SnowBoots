# SB Header

## Issues

| ID | Fix |
|----|-----|
| #28 | Skip link first in tab order → `#main-content` |
| #46 | `role="banner"` on header; `<nav aria-label="Primary">` |
| #36 | Toggle `aria-expanded` / `aria-controls` via template + `client.js` |

## Install

1. Create or clone a portal header widget → name `SB Header`.
2. HTML Template ← `template.html`.
3. Client Script ← adapt `client.js` to your widget’s controller shape (AngularJS `function($scope)` vs SP `api.controller`).
4. Set portal **Header** to this widget (lab portal only).
5. On every lab page, ensure main content has `id="main-content"`, `role="main"`, `tabindex="-1"`.
6. Theme must load `snowboots-a11y.scss` (skip-link styles).

## Acceptance

- First Tab: “Skip to main content” visible; Enter moves focus into main.
- axe: banner + navigation landmarks present.
- Mobile: toggle announces expanded/collapsed via `aria-expanded`.

## Customize

- Replace Home/Litmus links with `spMenu` / instance menu data from the Server Script.
- Brand title: set `data.portal_title` in Server Script or hardcode.
