# Twilio campaign form: what to paste in each field

Edit the existing campaign (the vetting fee is charged once per campaign). Fill the three `[...]` values first: the published site address, your Twilio number, your support email. The brand name "C.W Calendar" must match the brand on your Twilio brand registration everywhere; the legal name on the pages must match the brand registration too.

Publish first (GitHub Pages: a public repo, Settings, Pages, Deploy from a branch, main, root), then confirm these open in a private window:
- `https://[username].github.io/[repo]/` (index.html, the opt-in page)
- `https://[username].github.io/[repo]/privacy.html`
- `https://[username].github.io/[repo]/terms.html`

Take a screenshot of the opt-in page and host it somewhere public (a Drive or OneDrive link set to anyone with the link), for the Message Flow field.

## Campaign description
```
C.W Calendar is a private SMS calendar assistant operated by [legal name]. Two invited users (the account owner and one household member) text natural-language requests to create, update, or look up events on their Google Calendar. The service replies with confirmations, event details, and reminders the user requested. All messages are conversational and transactional. No marketing or promotional content is sent.
```

## Sample messages (every one names the brand; number 5 carries the opt-out line)
```
1. C.W Calendar: Added Dinner at Nobu, Fri May 3 at 7:00 PM.
2. C.W Calendar: Reminder, doctor appointment tomorrow at 10:00 AM.
3. C.W Calendar: Added "Diane's birthday party" Apr 21 at 9:00 AM with weekly reminders.
4. C.W Calendar: You have 2 events tomorrow: Gym 6:00 AM, Team call 1:00 PM.
5. C.W Calendar: Updated, dinner moved to Thursday at 7:30 PM. Reply STOP to opt out.
```

## Content checkboxes
Leave all four unticked (no embedded links, no phone numbers, no lending, no age-gated content) as long as the real replies carry none of those.

## Privacy policy link
`https://[username].github.io/[repo]/privacy.html`

## Terms of service link
`https://[username].github.io/[repo]/terms.html`

## Message Flow
```
End users opt in by texting the keyword START to [Twilio number] from their own mobile phone. The program, keyword, and full disclosures are published at https://[username].github.io/[repo]/ (screenshot: [public link]). Participation is limited to two invited users: the account owner and one household member. After texting START, the user receives a confirmation that identifies C.W Calendar, describes the messages, states that message frequency varies and that msg & data rates may apply, and gives HELP and STOP instructions. Opt-in data is not shared with third parties. Privacy Policy: https://[username].github.io/[repo]/privacy.html. Terms: https://[username].github.io/[repo]/terms.html.
```

## Opt-in keywords
`START`

## Opt-in message
```
C.W Calendar: You are opted in to calendar confirmations and reminders. Msg frequency varies. Msg & data rates may apply. Reply HELP for help, STOP to cancel.
```

## Opt-out keywords
Keep the current list: `OPTOUT,CANCEL,END,QUIT,UNSUBSCRIBE,REVOKE,STOP,STOPALL`

## Opt-out message
```
C.W Calendar: You are unsubscribed and will receive no further messages. Reply START to resubscribe.
```

## Help keywords
`HELP,INFO`

## Help message
```
C.W Calendar: Private calendar assistant. Support: [support email]. Msg frequency varies. Msg & data rates may apply. Reply STOP to cancel.
```

## Before you submit
- If the Messaging Service uses Twilio's default or Advanced Opt-Out replies, set its START, STOP and HELP replies to the three messages above, word for word.
- Run the error check, then submit.
- The app behind the number must ignore every sender that is not one of the two invited numbers.

## What changed from the rejected submission
- Pastebin links replaced by pages on a site tied to the brand (the rejection reasons for privacy, opt-in and terms).
- Opt-in message now states message frequency.
- Opt-out and help messages now name the brand; the help message names a support contact.
- Sample messages name the brand ("C.W Calendar:" instead of "Cal:") and one includes "Reply STOP to opt out".
- The privacy policy carries the no-sharing sentences the reviewers look for.

## Group texting (you, one household member and the number), from your earlier chat, not verified by me
One-to-one texting works with the plain Messaging webhook once the campaign is approved. A group thread needs an MMS-capable number, a Twilio Conversations Service with autocreation, and a backend that answers Conversations webhooks instead of plain SMS replies. It needs no new registration. Check the Twilio docs for Group Texting in Conversations before building it.
