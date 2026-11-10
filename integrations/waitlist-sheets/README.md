# Composita OS Waitlist → Google Sheets

Status: source prepared and locally tested. **Not installed or authorized in Google Apps Script.**

This integration reads the existing website's registration notifications in `info@ezeetech.tw` and appends genuine registrations to the designated spreadsheet's `Waitlist` tab every five minutes. No Vercel secrets or public webhook are required. It backfills matching existing notifications on the first run.

## One-time installation by the mailbox owner

1. Keep the spreadsheet's sharing set to **Restricted**, with only the owner and named managers granted access. Do not publish the email list or allow anonymous viewing/editing.
2. Sign in as `info@ezeetech.tw` and open the Waitlist spreadsheet. Choose **Extensions → Apps Script**. This must be a bound project, not a standalone script.
3. Replace `Code.gs` with the contents of this directory's `Code.gs`.
4. Under Project Settings, enable **Show appsscript.json manifest file in editor**. Replace that file with this directory's `appsscript.json` and save.
5. Run `setupWaitlistSync`. Review Google's authorization request yourself. It requests read-only Gmail access, editing this spreadsheet, and managing this script's time triggers. The code searches only website Waitlist notifications; Google does not offer a scope limited to that query. It cannot send or delete emails. Do not approve broader scopes if they appear unexpectedly.
6. Confirm a `syncWaitlist` time trigger exists and the execution succeeded. Test with one genuine registration, then verify it appears once within approximately five minutes.

Google's first authorization must be completed by the account owner. If a Workspace policy blocks the script, ask the Workspace administrator; do not bypass security warnings.

## Columns and operation

`Registered at`, `Gmail`, `Product`, `Language`, `Consent`, `Status`, `Contacted at`, `Source`, `Notes`.

- Registration time is the notification's Gmail receipt timestamp, displayed in Asia/Taipei, not a fabricated historical registration time.
- Status starts as `New`; managers can select `Invited`, `Contacted` or `Unsubscribed`.
- Existing status, contacted date and notes are never overwritten.
- Dots and plus tags are normalized for duplicate detection. Existing unsubscribed entries remain unchanged; handle reconsent manually.
- Retries use overlapping time windows, a script lock and email deduplication.
- No sample registrations are inserted, and visitor addresses are not logged.
- If importing over 1,000 rows, expand the existing filter range. The script preserves any manager-applied filter criteria.
- To pause, remove or disable only the `syncWaitlist` trigger in Apps Script. The website's existing email capture continues independently.
- Review Apps Script Executions and `WAITLIST_LAST_SUCCESS_ISO` in Script Properties to check sync health.

## Validation

Run `node scripts/check-waitlist-sheets.mjs`. Tests mock Google services and send no emails. Live Google authorization and a real end-to-end registration remain necessary before calling the sync active.

References: [Apps Script authorization](https://developers.google.com/apps-script/concepts/scopes), [Advanced Gmail service](https://developers.google.com/apps-script/advanced/gmail), [Time-driven triggers](https://developers.google.com/apps-script/guides/triggers/installable).
