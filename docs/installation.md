# SnowBoots Installation Guide

## Step 1: Create Style Sheets in ServiceNow

1. Navigate to **System UI > Style Sheets**.
2. Create new records:
   - `snowboots-core-overrides.scss`
   - `snowboots-a11y.scss`

## Step 2: Add to Theme

1. Go to your Portal's **Theme** record.
2. In **CSS Includes**, add the new Style Sheets (ensure they load **after** Bootstrap).

## Step 3: Test

- Clear cache (`cache.do`)
- Verify overrides in various widgets.

## Tips
- Use high specificity or `.snowboots` wrapper class for safe overrides.
- Monitor for conflicts with custom SN widgets.

For full SCSS files, see the root of this repo.