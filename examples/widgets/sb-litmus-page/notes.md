# Litmus page on Service Portal

Map the local harness [`examples/wcag-litmus-test-widget.html`](../../wcag-litmus-test-widget.html) onto a lab portal page.

## Goal

One page (e.g. `?id=sb-litmus`) that exercises CSS-remediated fixtures **and** Phase A shell demos (skip link is on the header; modal/navbar fixtures in the litmus body).

## Recommended layout

1. Portal uses **SB Header** (skip link + landmarks).
2. Page body container: `id="main-content" role="main" tabindex="-1"`.
3. Single custom widget **SB Litmus** whose HTML Template is derived from the local litmus file.

## Converting the HTML file to a widget template

1. Open `wcag-litmus-test-widget.html`.
2. **Do not** paste `<!DOCTYPE>`, `<html>`, `<head>`, or full Bootstrap CDN links if the Theme already loads Bootstrap + SnowBoots SCSS.
3. Paste from the main content wrapper inward (intro + category blocks + fixtures).
4. For Phase A modal demos, ensure Theme JS Include has `sb-theme-js/modal-a11y.js` and Bootstrap JS is available on the portal.
5. Keep `id="issue-NN"` sections so testers can deep-link and match `master-list.tsv`.

## Local vs PDI

| Environment | How to open |
|-------------|-------------|
| Local | Open `wcag-litmus-test-widget.html` in a browser (CDN Bootstrap + linked SCSS) |
| PDI | Lab portal page + SB Litmus widget; CSS via Theme Style Sheets |

## Verification

Follow checklists in [`docs/pdi-lab-setup.md`](../../../docs/pdi-lab-setup.md). CSS issues (#1–#20, focus, motion, touch) and Phase A shell issues have separate fixture blocks in the litmus file.
