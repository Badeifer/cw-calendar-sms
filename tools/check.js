// Checks that the three pages still carry every string a 10DLC reviewer looks for,
// that each page has its landmarks and one h1, and that every text colour in
// style.css meets WCAG AA (4.5:1) on the background it sits on.
// Run: node tools/check.js
'use strict';
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
const text = (f) => read(f).replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ');

const facts = {
  'index.html': [
    'C.W Calendar SMS Program',
    'operated by Cade Watkins',
    'Invited users text START to (714) 613-1574 from their own mobile phone.',
    'Participation is limited to two invited users: the account owner and one invited household member.',
    'No marketing or promotional messages are sent.',
    'Message frequency varies.',
    'Message and data rates may apply.',
    'Reply HELP for help, STOP to cancel at any time.',
    'Consent is not a condition of any purchase.',
    'C.W Calendar: You are opted in to calendar confirmations and reminders. Msg frequency varies. Msg & data rates may apply. Reply HELP for help, STOP to cancel.',
    'Reply STOP at any time to stop all messages. You will get one final message confirming you are unsubscribed. Reply START to rejoin.',
    'Reply HELP or INFO for help, or contact cadebrianwatkins@gmail.com.',
    'Support: cadebrianwatkins@gmail.com.',
    'Terms and Conditions',
    'Privacy Policy',
  ],
  'terms.html': [
    'C.W Calendar SMS Terms and Conditions',
    'Effective: October 14, 2026',
    'operated by Cade Watkins',
    'texting START to (714) 613-1574',
    'Participation is limited to two invited users',
    'Consent is not a condition of any purchase.',
    'Message frequency varies based on your requests.',
    'Message and data rates may apply.',
    'Reply STOP to any message to cancel at any time. You will receive one confirmation message and no further messages. Reply START to rejoin.',
    'The keywords STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT and REVOKE all stop messages.',
    'Reply HELP or INFO to any message for help, or email cadebrianwatkins@gmail.com.',
    'Carriers are not liable for delayed or undelivered messages.',
    'Privacy Policy',
  ],
  'privacy.html': [
    'C.W Calendar Privacy Policy',
    'Effective: October 14, 2026',
    'operated by Cade Watkins',
    'Your mobile phone number, when you opt in by texting START.',
    'Messages are delivered through Twilio.',
    'We do not sell or share your SMS opt-in data or personal information with third parties for marketing purposes.',
    'No mobile information will be shared with third parties or affiliates for marketing or promotional purposes.',
    'All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.',
    'Message frequency varies. Message and data rates may apply. Reply STOP to opt out at any time or HELP for help.',
    'This site sets no cookies and runs no analytics or advertising tags.',
    'cadebrianwatkins@gmail.com',
    'Terms and Conditions',
  ],
};

const links = {
  'index.html': ['href="terms.html"', 'href="privacy.html"', 'href="tel:+17146131574"', 'href="mailto:cadebrianwatkins@gmail.com"'],
  'terms.html': ['href="index.html"', 'href="privacy.html"'],
  'privacy.html': ['href="index.html"', 'href="terms.html"'],
};

let failed = 0;
for (const [file, list] of Object.entries(facts)) {
  const t = text(file);
  const raw = read(file);
  for (const s of list) {
    const ok = t.includes(s);
    if (!ok) failed++;
    console.log(`${ok ? 'ok     ' : 'MISSING'} ${file}: ${s}`);
  }
  for (const s of links[file]) {
    const ok = raw.includes(s);
    if (!ok) failed++;
    console.log(`${ok ? 'ok     ' : 'MISSING'} ${file}: ${s}`);
  }
  const h1 = (raw.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) { failed++; console.log(`FAIL ${file}: ${h1} h1 elements`); }
  for (const lm of ['<header', '<main', '<nav aria-label', '<footer', 'aria-current="page"']) {
    if (!raw.includes(lm)) { failed++; console.log(`FAIL ${file}: no ${lm}`); }
  }
}
if (/<form|<input|<button|\.fill\b/.test(read('style.css') + read('index.html') + read('terms.html') + read('privacy.html'))) {
  failed++;
  console.log('FAIL: form markup or placeholder rules present');
}

// Contrast: WCAG 2.x relative luminance.
const css = read('style.css');
const [lightBlock, darkRest] = css.split('@media (prefers-color-scheme: dark)');
const tokens = (block) => Object.fromEntries([...block.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]));
const light = tokens(lightBlock);
const dark = { ...light, ...tokens(darkRest.split('}')[0]) };
const lum = (hex) => {
  const c = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => {
  const [h, l] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (h + 0.05) / (l + 0.05);
};
const pairs = [
  ['ink', 'paper', 'body text, headings, wordmark, current nav link'],
  ['ink', 'panel', 'text inside the opt-in block'],
  ['ink-2', 'paper', 'nav links, dateline, footer text and links, list markers'],
  ['ink-2', 'panel', 'muted text if it ever sits on the panel'],
  ['accent', 'paper', 'links, focus ring'],
  ['accent', 'panel', 'phone link inside the opt-in block, quote bar'],
];
console.log('\n| Text on background | Light | Dark |');
console.log('|---|---|---|');
for (const [fg, bg, use] of pairs) {
  const l = ratio(light[fg], light[bg]);
  const d = ratio(dark[fg], dark[bg]);
  if (l < 4.5 || d < 4.5) failed++;
  console.log(`| ${fg} on ${bg} (${use}) | ${light[fg]} on ${light[bg]}: ${l.toFixed(2)}:1 | ${dark[fg]} on ${dark[bg]}: ${d.toFixed(2)}:1 |`);
}
console.log(`\nRules (decorative, not text): line on paper, light ${ratio(light.line, light.paper).toFixed(2)}:1, dark ${ratio(dark.line, dark.paper).toFixed(2)}:1`);
console.log(failed ? `\n${failed} problem(s)` : '\nAll checks pass');
process.exit(failed ? 1 : 0);
