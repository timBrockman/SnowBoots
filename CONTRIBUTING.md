# Contributing to SnowBoots

Thank you for considering contributing to SnowBoots!

## How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make **modular commits** (one logical change per commit)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development Setup

- Clone the repo
- Edit SCSS, litmus fixtures, and/or `examples/widgets/` patterns
- Test locally with `examples/wcag-litmus-test-widget.html`
- Validate on a ServiceNow **PDI lab portal** — [docs/pdi-lab-setup.md](docs/pdi-lab-setup.md)

## Commit message style

Issue IDs from [`research/master-list.tsv`](research/master-list.tsv) map to commits:

| Prefix | Example |
|--------|---------|
| `fix(a11y):` | `fix(a11y): remediate issue #28` |
| `feat(widgets):` | `feat(widgets): add SB header pattern for issues #28, #46` |
| `test(litmus):` | `test(litmus): add fixture for issue #70` |
| `research:` | `research: mark Phase A shell patterns in master-list` |
| `docs:` | `docs: add PDI lab setup guide` |

Do not mix SCSS, widget patterns, research TSV, and docs in a single commit. See the [widget remediation playbook](docs/widget-remediation-playbook.md).

## Code of Conduct

This project follows the [Contributor Covenant](https://www.contributor-covenant.org/).

Please report any issues or questions in the Issues tab.
