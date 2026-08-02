# SnowBoots Installation Guide

Drop-in Style Sheets for any Service Portal Theme. For a full lab portal (header patterns, Theme JS, litmus page), see **[PDI lab setup](pdi-lab-setup.md)**.

## Step 1: Create Style Sheets in ServiceNow

1. Navigate to **System UI > Style Sheets**.
2. Create new records and paste repo root files:
   - `SnowBoots Core Overrides` ← `snowboots-core-overrides.scss`
   - `SnowBoots a11y Overrides` ← `snowboots-a11y.scss`

## Step 2: Add to Theme

1. Go to your Portal's **Theme** record (prefer a **cloned** lab Theme).
2. In **CSS Includes**, add the new Style Sheets **after** Bootstrap, with **a11y last**:

   | Order | Include |
   |------:|---------|
   | 1 | Bootstrap |
   | 2 | SnowBoots Core Overrides |
   | 3 | SnowBoots a11y Overrides |

## Step 3: Test

- Clear cache (`cache.do`)
- Verify contrast and focus rings on buttons and links
- Optional: open the [litmus harness](../examples/wcag-litmus-test-widget.html) locally or as a portal widget

## Tips

- Use high specificity (`html body`) already built into SnowBoots; avoid fighting it with later includes that reset focus/outline.
- Monitor for conflicts with custom SN widgets.
- Skip-link **styles** ship in a11y SCSS; skip-link **markup** requires a header pattern — see [examples/widgets/sb-header](../examples/widgets/sb-header/).

## Next steps

| Doc | When |
|-----|------|
| [PDI lab setup](pdi-lab-setup.md) | Building `/snowboots` lab portal + Phase A widgets |
| [Widget remediation playbook](widget-remediation-playbook.md) | Cloning widgets and tracking issues |
| [examples/widgets/README.md](../examples/widgets/README.md) | Paste map for header / Theme JS |

For full SCSS files, see the root of this repo.
