# SnowBoots PDI Lab Setup

Build a disposable Service Portal lab on a Personal Developer Instance (PDI) to validate SnowBoots CSS and Phase A shell patterns (skip link, landmarks, modal focus).

## Prerequisites

- Active [ServiceNow PDI](https://developer.servicenow.com) (Tokyo / Utah / Vancouver / Washington DC+; Bootstrap 3.3.6)
- Admin (or equivalent) to create Style Sheets, Themes, Portals, Widgets, and JS Includes
- Browser with axe DevTools (or WAVE) and keyboard-only testing habits
- This repo cloned locally for copy-paste of SCSS and `examples/widgets/`

Treat the lab portal as disposable. Prefer **clones** of OOB widgets; do not edit stock Header / Employee Center widgets in place.

## 1. Load SnowBoots CSS

1. Navigate to **System UI → Style Sheets**.
2. Create two records (SCSS type if available; otherwise paste into the CSS/SCSS field):
   - Name: `SnowBoots Core Overrides` — paste `snowboots-core-overrides.scss`
   - Name: `SnowBoots a11y Overrides` — paste `snowboots-a11y.scss`
3. Open or **clone** the Theme used by your lab portal (**Service Portal → Themes**).
4. On the Theme, **CSS Includes** related list — order matters:

   | Order | Include |
   |------:|---------|
   | 1 | Bootstrap (existing) |
   | 2 | SnowBoots Core Overrides |
   | 3 | SnowBoots a11y Overrides (last) |

5. Clear instance cache: open `https://<instance>/cache.do`, then hard-refresh the portal.

### CSS smoke test

- Primary buttons use darker high-contrast blue
- Tab to a button/link → visible focus ring (outline + offset)

If nothing changes, the sheets are on the wrong Theme or load order is wrong.

## 2. Create the lab portal

1. **Service Portal → Portals** → New (or clone a simple portal).
2. Suggested URL suffix: `snowboots` → `https://<instance>/snowboots`.
3. Set **Theme** to your SnowBoots lab Theme.
4. Clone or assign a minimal **Header** and **Footer** (see step 3).

Keep production / default Employee Center portals on their original themes.

## 3. Install Phase A patterns

Patterns live in the repo under [`examples/widgets/`](../examples/widgets/). Follow that folder’s README for field mapping.

### 3.1 Header widget (issues #28, #46, #36)

1. **Service Portal → Widgets** → New (or **Copy** an OOB header, then replace template).
2. Name: `SB Header` (or similar).
3. Paste:
   - HTML Template ← `examples/widgets/sb-header/template.html`
   - Client Script ← `examples/widgets/sb-header/client.js`
4. Set this widget as the portal **Header** (or place it in the header container).
5. Ensure the main content region of each lab page has:

   ```html
   <div id="main-content" role="main" tabindex="-1">
     <!-- page widgets -->
   </div>
   ```

   Service Portal often wraps content in containers; add `id="main-content"` and `role="main"` on the primary content container widget or page body markup. Skip link targets `#main-content`.

### 3.2 Theme JS Include (issues #25, #26, #48)

1. Create a **UI Script** or Theme **JS Include** source containing `examples/widgets/sb-theme-js/modal-a11y.js`.
2. Add it to the lab Theme **JS Includes** (after jQuery / Bootstrap JS if those are listed separately).
3. See `examples/widgets/sb-theme-js/notes.md` for behavior and limits.

### 3.3 Litmus page

1. Create a Portal **Page** (e.g. `sb-litmus`).
2. Add a custom widget whose template is adapted from `examples/wcag-litmus-test-widget.html` (strip outer `<html>`/`<head>`; keep fixture sections), **or** host static HTML in a widget as documented in `examples/widgets/sb-litmus-page/notes.md`.
3. Confirm page content sits under `#main-content`.

## 4. Verification checklist

Run on the lab portal after `cache.do`:

| Check | Issue | Pass criteria |
|-------|------:|---------------|
| CSS contrast / focus | #1–#24 (CSS) | Buttons/links meet contrast; `:focus-visible` ring visible |
| Skip link | #28 | First Tab shows “Skip to main content”; activates → focus in main |
| Landmarks | #46 | axe: banner, navigation, main present; one primary main |
| Modal focus | #25 | Opening modal moves focus into dialog |
| Modal trap / Esc | #26 | Tab cycles inside modal; Esc closes and restores focus |
| Modal ARIA | #48 | Dialog has `role="dialog"`, `aria-modal="true"` when open |
| Navbar toggle | #36 | Mobile menu toggle sets `aria-expanded` true/false |

Tools: keyboard only, axe DevTools / WAVE, optional NVDA/VoiceOver.

## 5. Capture results back to git

1. Open an Update Set (e.g. `SnowBoots a11y Phase A`) before platform edits.
2. After verification, update `research/master-list.tsv` `RemediationAssessment` for verified issue IDs (separate `research:` commit).
3. If you improved a pattern on the instance, copy HTML/JS back into `examples/widgets/` and commit (`feat(widgets):` / `fix(widgets):`).

## 6. Troubleshooting

| Symptom | Likely cause |
|---------|----------------|
| No CSS change | Wrong Theme; a11y not after core; cache not cleared |
| Skip link missing | Header widget not on portal; template not deployed |
| Skip link does nothing | No `id="main-content"` on page |
| Modal trap inactive | Theme JS Include missing; jQuery/Bootstrap modal not used |
| Focus ring clipped | Overlapping custom CSS; z-index — rely on a11y.scss focus rules |

## Related docs

- [Installation](installation.md) — Style Sheet + Theme CSS only
- [Widget remediation playbook](widget-remediation-playbook.md) — clone workflow, commits, backlog
- [examples/widgets/README.md](../examples/widgets/README.md) — paste mapping for widgets
