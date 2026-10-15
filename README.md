# C.W Calendar SMS site (published at https://badeifer.github.io/cw-calendar-sms/)

Three public pages the Twilio A2P 10DLC registration needs for the C.W Calendar texting assistant: `index.html` (the SMS Program and opt-in page), `terms.html` (terms with bold HELP and STOP), `privacy.html` (privacy policy). Plus `style.css` and `favicon.svg`, no scripts, no web fonts, no tracking. `twilio-fields.md` holds the exact text for every field of the campaign form.

Drafted 2026-10-14 on the laptop from the rejected submission's details (brand C.W Calendar, keyword START, the opt-out and help keywords, two invited users).

Filled in on 2026-10-14: legal name Cade Watkins (sole proprietor brand), number (714) 613-1574, support cadebrianwatkins@gmail.com. The two allowed personal numbers are not in this repo. `opt-in-page.png` is the screenshot of the opt-in page that the Message Flow field links to.

Published from this public repo with GitHub Pages (main, root). Fill the Twilio form from `twilio-fields.md` and resubmit the existing campaign.

## Keeping the pages honest

- `node tools/check.js` confirms every string a reviewer looks for is still on the page it belongs to, that each page has one h1 and its landmarks, and that every text colour meets WCAG AA (4.5:1) in light and dark mode. Run it after any edit.
- The names "SMS Program", "Terms and Conditions" and "Privacy Policy" stay in title case on purpose: they are the names the Twilio form and the reviewers use. Everything else is sentence case.
- The look is one serif system stack (Charter, Iowan Old Style, Palatino Linotype, Cambria, Georgia), six colour tokens at the top of `style.css`, and no motion. Change a token there, not a colour in a rule.

## Retaking the opt-in screenshot

After a change to `index.html` or `style.css` that alters the layout, retake `opt-in-page.png` so the Message Flow screenshot matches the live page:

1. Open https://badeifer.github.io/cw-calendar-sms/ in a private window at about 1100 px wide, light mode.
2. Capture the full page (Firefox: right click, Take Screenshot, Save full page; Chrome: DevTools, Ctrl+Shift+P, "Capture full size screenshot").
3. Save it over `opt-in-page.png` in the repo root, commit and push. The Message Flow field already links to that file name, so the form needs no change.
