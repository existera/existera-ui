# Accessibility

Existera UI provides an optional contrast-audited palette targeting WCAG 2.2 Level AA. This document describes the library's
tested behavior and application responsibilities; it is not a certification of
every component combination or of an application built with the library.

## Visual and contrast modes

The default theme preserves the approved brand colors, subtle unfocused field
borders, and hover-only link underlines. Some of these defaults do not meet AA
contrast thresholds. Keyboard, ARIA, labels, error relationships, and focus traps
remain enabled in both modes.

Enable the audited contrast palette on the root element:

```html
<html data-theme="light" data-contrast="more">
```

Use `data-theme="dark"` for dark mode. Remove `data-contrast` to restore the
standard appearance. Strict axe/color assertions below apply to `data-contrast="more"`;
keyboard-only scenarios also exercise the default palette. Do not claim AA color
conformance for the restored default palette or for arbitrary theme overrides.

## Automated checks

Audit date: 4 November 2026. Browser: Chromium on Windows. The final suite has
42 scenarios covering the audited palette and default keyboard behavior. Actual screen
reader testing is tracked separately below; axe incomplete results require review.

In a repository checkout, run `npm ci`, `npm run test:a11y:install`, and `npm run test:a11y`.
Playwright starts a local Vite server and uses Chromium with axe-core. Fixtures
live in `tests/accessibility/`. Results, screenshots, and full axe JSON reports
are written to `work/accessibility-results/`.

The suite checks the WCAG 2 A/AA, 2.1 AA, and 2.2 AA rules available in axe,
plus actual keyboard interactions and additional contrast assertions. No WCAG rules are explicitly disabled. The following behaviors are exercised:

- Light/dark palettes, solid/soft/outline/text variants, field sizes and states,
  code themes, hover and focus. Normal text is checked against 4.5:1; field
  boundaries and meaningful indicator colors are checked against 3:1.
- Modal, flyout, image, PDF, and video dialogs: initial focus, forward/backward
  Tab containment, Escape, accessible name, and restoration to their trigger.
- File selection using Enter, named file removal, dropdown navigation that skips
  disabled items, tabs, accordion, tree, slider, and switch keyboard operation.
- Date/range/time picker entry and Escape, open popup semantics and scroll access.
- Combobox/mention active descendants, listbox selection, and retained input focus.
- Field names, error descriptions, invalid state, current pagination page,
  progress value, audio volume, and persistent notification semantics.
- Keyboard and click alternatives for Kanban movement and Widget move/resize.
- Narrow viewport reflow and a forced-colors focus check.

Related WCAG criteria include 1.3.1, 1.4.3, 1.4.10, 1.4.11, 2.1.1, 2.1.2,
2.4.3, 2.4.7, 2.5.7, 3.3.1, 3.3.2, 4.1.2, and 4.1.3. A passing automated
check is evidence for the tested scenarios, not proof of all success criteria.

The HTML report is available at `work/accessibility-report/index.html`; serve it
with `npx playwright show-report work/accessibility-report`. The CI workflow
`.github/workflows/accessibility.yml` runs production, component, and accessibility
checks and retains the reports as build artifacts.

## Accessible usage

- Give every field a visible `<label>` linked through `htmlFor` and `id`, or an
  appropriate `aria-label`/`aria-labelledby`. Placeholders do not replace labels.
- Describe errors in text with `aria-describedby` and set `state="error"` or
  `aria-invalid`. Do not communicate status through color alone.
- Name icon-only buttons. Give dialogs a meaningful `aria-label` or connect
  their visible heading using the component's heading-ID property.
- Date ranges and time controls have multiple inputs. Give the control an
  `aria-label`; each part receives a distinct start/end or hour/minute name.
- Solid component fills use `--color-*-solid` with white text. Accent text and
  indicator colors use `--color-*`. If overriding themes, recheck contrast for
  all backgrounds, interaction states, and small text.
- Keep focus indicators visible and allow space around interactive targets.
  The smallest shared control height is 24 CSS pixels in contrast mode (22px in
  the standard compact size). Custom classes, inline
  links, dismiss actions, and dense layouts still need target-size review.
- Supply accurate image alternatives (`alt` on Image Viewer and `mediaAlt` on
  Chat Bubble) and use descriptive link/button text. Links are underlined by default in the audited contrast mode.
- For video/audio, supply captions, transcripts, and audio descriptions when
  required by the content. Optional subtitle support alone does not satisfy
  media accessibility requirements.
- PDF canvas rendering exposes current-page extracted text, not the complete
  semantic structure of a tagged PDF. Supply an accessible original document
  or equivalent HTML for reading order, tables, forms, links, and complex layouts.
- Persistent notifications are supported with `duration: 0`; keep critical
  instructions available outside transient toasts.

## Manual verification still required

Real assistive-technology testing is distinct from DOM/ARIA assertions. Before
claiming application-level conformance, complete and record these checks:

| Environment | Required manual check | Current status |
| --- | --- | --- |
| NVDA with Chrome/Firefox on Windows | Names, roles, values, errors, live regions, popup announcements, reading order | Not performed in this audit |
| VoiceOver with Safari on macOS/iOS | Forms, dialogs, listbox/combobox interaction and touch exploration | Not performed in this audit |
| Browser zoom/text resizing | 200% text and 400% zoom, clipping, focus visibility, and custom layouts | Narrow viewport automated; full manual review pending |
| Windows high contrast | All states, selected controls, icons, and media toolbars | Basic forced-colors focus automated; full manual review pending |
| Real media and documents | Captions, transcripts, audio descriptions, tagged PDF/HTML alternatives | Application-content review required |
| Custom themes and compositions | Text/non-text contrast, target spacing, and full task completion | Application integration review required |

WCAG references: [text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html),
[non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html),
[target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html),
and [modal dialog interaction](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/).
