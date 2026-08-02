# SnowBoots widget patterns

Paste-ready Service Portal patterns for issues that **CSS alone cannot fix**. Pair with Theme Style Sheets (`snowboots-core-overrides.scss`, `snowboots-a11y.scss`).

## Contents

| Folder | Issues | Platform target |
|--------|--------|-----------------|
| [`sb-header/`](sb-header/) | #28, #46, #36 | Portal header widget |
| [`sb-theme-js/`](sb-theme-js/) | #25, #26, #48 | Theme JS Include / UI Script |
| [`sb-litmus-page/`](sb-litmus-page/) | harness | Lab page using litmus HTML |

## How to install a pattern

1. Prefer **copying** an OOB widget, then replace Template / Client Script — do not edit stock widgets in place.
2. Open the matching folder; read `notes.md`.
3. Map files to ServiceNow fields:

   | File | ServiceNow field |
   |------|------------------|
   | `template.html` | Widget → HTML Template |
   | `client.js` | Widget → Client Script |
   | `modal-a11y.js` | Theme → JS Includes (or UI Script referenced by the Theme) |

4. Attach the widget to the **lab** portal only; clear cache (`cache.do`).
5. Verify with the checklist in [`docs/pdi-lab-setup.md`](../../docs/pdi-lab-setup.md).

## Main content requirement

Skip link and landmarks assume the page body provides:

```html
<div id="main-content" role="main" tabindex="-1">
  <!-- page content -->
</div>
```

Add this on the layout container or a dedicated content wrapper widget.

## Contributing

Improve a pattern on your PDI, copy it back here, update `research/master-list.tsv`, and commit with modular messages (`feat(widgets):`, `fix(widgets):`). See [`docs/widget-remediation-playbook.md`](../../docs/widget-remediation-playbook.md).
