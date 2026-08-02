# Widget Remediation Playbook

How to fix Service Portal accessibility issues that CSS cannot solve, without breaking OOB upgrades.

## Principles

1. **Clone, don’t edit OOB** — Copy the stock widget, remediate the clone, place the clone on lab pages only.
2. **Shell first** — Header, landmarks, skip link, and modal JS improve every page before catalog widgets.
3. **One issue cluster at a time** — Use IDs from [`research/master-list.tsv`](../research/master-list.tsv).
4. **Patterns live in git** — Instance is the lab; `examples/widgets/` is the source of truth for SnowBoots-owned markup/JS.
5. **Modular commits** — One logical change per commit (see commit message style below).

## Workflow loop

```
1. Pick 1–3 issue IDs (same category) from master-list.tsv
2. Reproduce on litmus page + one real cloned widget
3. Fix clone HTML Template and/or Client Script (or Theme JS Include)
4. Keyboard-only pass + axe DevTools (optional screen reader)
5. Copy improved markup/JS back to examples/widgets/ if it is a SnowBoots pattern
6. Update RemediationPath / RemediationAssessment in master-list.tsv
7. Commit (modular) and move to the next cluster
```

## Cloning a widget safely

1. Open **Service Portal → Widgets**.
2. Open the OOB widget → **Copy** / **Insert and Stay** as a new record.
3. Rename: `SB - <purpose>` (e.g. `SB Header`, `SB Search`).
4. Edit **only** the clone’s HTML Template, Client Script, CSS (if needed), and Server Script.
5. On the lab page or portal Header/Footer fields, point to the clone — leave other portals on OOB.

### Update Sets

- Open an Update Set before platform work: e.g. `SnowBoots a11y Phase A`.
- Capture only lab Theme, Style Sheets, SB widgets, JS Includes, and lab pages.
- Do not mix unrelated global customizations.

## Theme CSS vs Theme JS vs widget HTML

| Layer | Use for | Examples |
|-------|---------|----------|
| Style Sheets (SnowBoots SCSS) | Global visual a11y | Contrast, focus ring, touch targets, reduced motion, skip-link **styles** |
| Theme JS Include | Cross-page behavior | Modal focus trap, shared helpers |
| Widget HTML / client | Structure & names | Skip link markup, landmarks, labels, aria-* on controls |

CSS cannot set meaningful `alt`, move focus, or invent landmark roles. Prefer the correct layer.

## Commit message style

Issue IDs in `master-list.tsv` map to commits:

| Prefix | Use |
|--------|-----|
| `fix(a11y): remediate issue #NN` | SCSS accessibility fix |
| `feat(widgets): … issues #NN` | New or extended widget pattern under `examples/widgets/` |
| `fix(widgets): …` | Correction to an existing pattern |
| `test(litmus): add fixture for issue #NN` | Litmus harness only |
| `research: …` | `master-list.tsv` or research TSVs |
| `docs: …` | Documentation only |

Keep commits **single-purpose**. Do not mix SCSS, widget patterns, research, and docs in one commit.

## Updating the backlog

In `research/master-list.tsv`, maintain:

- **RemediationPath** — where the fix lives (file path, Theme JS, “requires PDI verification”)
- **RemediationAssessment** — short status, e.g.:
  - `Pattern in examples/widgets/sb-header — apply on PDI clone`
  - `Remediated | a11y.scss | …` (CSS done)
  - `Verified on PDI lab portal YYYY-MM-DD`

Do **not** mark instance-verified until checked on a PDI lab portal.

## Testing standards

Minimum for each remediated cluster:

1. **Keyboard** — Tab / Shift+Tab / Enter / Space / Esc; no trap except intentional modal trap
2. **Visible focus** — ring remains clear (SnowBoots a11y CSS)
3. **axe / WAVE** — zero new critical/serious on the fixed surface
4. **Acceptance criteria** — row in `master-list.tsv` for that IssueID

Optional: NVDA (Windows) or VoiceOver for ARIA/live regions.

## Phase order (project default)

| Phase | Focus | Example issues |
|-------|--------|----------------|
| A — Shell | Skip link, landmarks, modal JS, navbar toggle | #28, #46, #25–#26, #48, #36 |
| B — Forms / search | Labels, errors, icon buttons, dropdowns | #49–#52, #30, #31, #71 |
| C — Content | Images, tables, headings | #41–#43, #53–#54 |
| D — Variants | Bootstrap / custom widget repeats | Pattern reuse |

Ship Phase A patterns from this repo before expanding B–D.

## Related docs

- [PDI lab setup](pdi-lab-setup.md)
- [Installation](installation.md)
- [examples/widgets/README.md](../examples/widgets/README.md)
