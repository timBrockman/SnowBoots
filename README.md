# SnowBoots

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![ServiceNow](https://img.shields.io/badge/ServiceNow-Community-blue)](https://www.servicenow.com/community)
<!-- Add more badges: stars, version, etc. -->

**Modern Bootstrap 3.3.6 overrides for ServiceNow Service Portal** — better performance, accessibility (WCAG AAA targeted), and modern CSS while remaining fully drop-in compatible.

## Problem
ServiceNow bakes in Bootstrap 3.3.6, making upgrades risky for legacy components. SnowBoots layers modern enhancements on top.

## Features
- Post-processing CSS/SCSS overrides
- Dedicated `a11y.css` with high-contrast fixes, focus indicators, reduced motion
- Modern CSS (variables, flexbox enhancements, container queries where safe)
- Easy Theme integration

## Quick Start
1. Download `snowboots-core-overrides.scss` + `snowboots-a11y.scss`
2. Create Style Sheets in your ServiceNow instance
3. Add to your Portal **Theme** → CSS Includes (after Bootstrap)
4. [Detailed instructions →](docs/installation.md)

## Screenshots / Before-After
(Include contrast improvements, navbar, forms, etc.)

## Compatibility
- ServiceNow Tokyo / Utah / Vancouver / Washington DC + (Bootstrap 3.3.6)
- Tested with common widgets

## Roadmap
- MVP: Core + a11y
- Future: Full modern fork, JS enhancements, npm package

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md). Pull requests welcome!

## License
MIT — feel free to use and adapt in your instances.
