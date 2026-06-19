# SnowBoots

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![ServiceNow](https://img.shields.io/badge/ServiceNow-Community-blue)](https://www.servicenow.com/community)
[![a11y](https://img.shields.io/badge/a11y-v0.2.0-green)](snowboots-a11y.scss)

**Modern Bootstrap 3.3.6 overrides for ServiceNow Service Portal** — better performance, accessibility (WCAG AAA targeted), and modern CSS while remaining fully drop-in compatible.

## Problem

ServiceNow bakes in Bootstrap 3.3.6, making upgrades risky for legacy components. SnowBoots layers modern enhancements on top without replacing the framework.

## What's in the repo

| File | Version | Purpose |
|------|---------|---------|
| [`snowboots-core-overrides.scss`](snowboots-core-overrides.scss) | 0.1.0 | Layout polish, CSS variables, component enhancements |
| [`snowboots-a11y.scss`](snowboots-a11y.scss) | **0.2.0** | WCAG-focused overrides: contrast, focus, motion, touch targets |
| [`examples/wcag-litmus-test-widget.html`](examples/wcag-litmus-test-widget.html) | 0.2 | Manual test harness with fixtures for all CSS-remediated issues |
| [`research/master-list.tsv`](research/master-list.tsv) | — | 180-issue accessibility backlog with remediation tracking |

Load **core** first, then **a11y**, both after Bootstrap in your Theme CSS Includes.

## Features

### Core overrides (`snowboots-core-overrides.scss`)
- Post-processing SCSS overrides with `html body` specificity
- CSS custom properties for theming
- Layout and component polish for common portal patterns

### Accessibility layer (`snowboots-a11y.scss` v0.2.0)

**34 of 180** tracked issues are remediated purely via CSS:

| Section | Issues | Coverage |
|---------|--------|----------|
| Color contrast tokens & overrides | #1–#20 | Buttons, alerts, labels, tables, nav, forms, charts |
| Enhanced focus indicators | #21–#24, #34, #35, #40 | `:focus-visible` with outline + box-shadow fallback |
| Touch targets & form controls | #70 | 44×44px minimum on buttons, inputs, checkbox/radio labels |
| Reduced motion & typography | #111, #113, #117, #120 | `prefers-reduced-motion`, rem-based scaling |
| Widget-scoped overrides | #146, #156 | `.widget` form controls and buttons |

Issues #21, #23, #24, #40, and #111 were remediated in v0.1; v0.2.0 adds the remaining 29 CSS-addressable fixes.

**Not covered by CSS alone:** 119 issues in [`research/master-list.tsv`](research/master-list.tsv) still require widget HTML changes, client scripts, or ServiceNow platform configuration. See the `RemediationPath` and `RemediationAssessment` columns for per-issue guidance.

## Quick Start

1. Download `snowboots-core-overrides.scss` and `snowboots-a11y.scss`
2. Create Style Sheet records in your ServiceNow instance
3. Add both to your Portal **Theme → CSS Includes** (after Bootstrap; a11y after core)
4. Clear cache (`cache.do`) and verify in your portal
5. [Detailed instructions →](docs/installation.md)

## Testing

Use the [WCAG Litmus Test Widget](examples/wcag-litmus-test-widget.html) to validate remediated issues:

1. Open the page locally (or deploy as a Service Portal widget)
2. Confirm Bootstrap 3.3.6 + both SnowBoots style sheets are loaded
3. Work through each `#issue-NN` section — acceptance criteria and test steps are inline
4. Run **axe DevTools** / **WAVE** on contrast sections; tab through focus sections; emulate **prefers-reduced-motion** in DevTools for motion checks

## Project structure

```
SnowBoots/
├── snowboots-core-overrides.scss   # Core theme overrides
├── snowboots-a11y.scss             # Accessibility layer (v0.2.0)
├── examples/
│   └── wcag-litmus-test-widget.html
├── research/
│   ├── master-list.tsv             # Canonical 180-issue backlog
│   └── *.tsv                       # Source issue batches
└── docs/
    └── installation.md
```

## Compatibility

- ServiceNow Tokyo / Utah / Vancouver / Washington DC+ (Bootstrap 3.3.6)
- Tested against common portal widgets via the litmus harness

## Roadmap

- [x] Core overrides MVP (v0.1.0)
- [x] a11y layer — all CSS-addressable issues (v0.2.0, 34 issues)
- [x] Issue backlog + litmus test harness
- [ ] Widget HTML / client script fixes for remaining JS/ServiceNow issues
- [ ] npm package and automated contrast/regression tests

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Issue IDs in [`research/master-list.tsv`](research/master-list.tsv) map to commit messages — use `fix(a11y): remediate issue #NN` or `test(litmus): add fixture for issue #NN` when submitting changes.

## License

MIT — feel free to use and adapt in your instances.