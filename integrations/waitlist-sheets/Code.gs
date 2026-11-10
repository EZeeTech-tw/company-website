/**
 * Install inside the private Waitlist spreadsheet under Extensions > Apps Script.
 * Reads matching notifications only; never sends, deletes, labels or modifies mail.
 * No web app, public endpoint, API key or Vercel credential is needed.
 */
const WAITLIST_SHEET_ID = '1c4l8j4qF3yo3V_N6J_8QVs5ydnwOjPd47ZCJQMj0ZAs';
const WAITLIST_HEADERS = ['Registered at', 'Gmail', 'Product', 'Language', 'Consent', 'Status', 'Contacted at', 'Source', 'Notes'];

function setupWaitlistSync() {
  // Fail before creating a schedule if the account, sheet or Gmail service is wrong.
  syncWaitlist();
  const exists = ScriptApp.getProjectTriggers().some(trigger => trigger.getHandlerFunction() === 'syncWaitlist');
  if (!exists) ScriptApp.newTrigger('syncWaitlist').timeBased().everyMinutes(5).create();
}

function syncWaitlist() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(1000)) return;
  try {
    const book = SpreadsheetApp.getActiveSpreadsheet();
    if (!book || book.getId() !== WAITLIST_SHEET_ID) throw new Error('Install this script inside the designated Waitlist spreadsheet.');
    const sheet = book.getSheetByName('Waitlist');
    if (!sheet || JSON.stringify(sheet.getRange(1, 1, 1, 9).getValues()[0]) !== JSON.stringify(WAITLIST_HEADERS)) {
      throw new Error('Waitlist headers changed. Restore the nine agreed columns before syncing.');
    }
    const profile = Gmail.Users.getProfile('me');
    if (profile.emailAddress.toLowerCase() !== 'info@ezeetech.tw') {
      throw new Error('Run setup as info@ezeetech.tw so the correct mailbox is used.');
    }
    const properties = PropertiesService.getScriptProperties();
    const lastSync = Number(properties.getProperty('WAITLIST_SYNC_THROUGH_MS') || 0);
    // A two-day overlap catches delayed mail; existing sheet emails prevent duplicates.
    const after = lastSync ? ` after:${Math.floor((lastSync - 172800000) / 1000)}` : '';
    const query = 'from:noreply@ezeetech.tw subject:"Composita OS Waitlist"' + after;
    const seen = new Set(sheet.getLastRow() < 2 ? [] : sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).getValues().flat().filter(Boolean).map(waitlistEmailKey));
    const rows = [];
    const started = Date.now();
    let pageToken;
    do {
      const page = Gmail.Users.Messages.list('me', { q: query, maxResults: 100, ...(pageToken ? { pageToken } : {}) });
      for (const item of page.messages || []) {
        // Abort without advancing the checkpoint if Google approaches its execution limit.
        // The next run safely retries the same window; nothing is silently skipped.
        if (Date.now() - started > 240000) throw new Error('Sync window is too large; retry or run a manual backfill before enabling the schedule.');
        const message = Gmail.Users.Messages.get('me', item.id, { format: 'full' });
        const registration = parseWaitlistMessage(message);
        if (!registration || seen.has(waitlistEmailKey(registration.email))) continue;
        seen.add(waitlistEmailKey(registration.email));
        rows.push([new Date(registration.timestamp), registration.email, 'Composita OS', registration.language, 'Agreed', 'New', '', 'Website waitlist', '']);
      }
      pageToken = page.nextPageToken;
    } while (pageToken);
    // Oldest first, without sorting or overwriting existing manual status/notes.
    rows.sort((a, b) => a[0] - b[0]);
    if (rows.length) {
      const start = sheet.getLastRow() + 1;
      const end = start + rows.length - 1;
      if (end > sheet.getMaxRows()) sheet.insertRowsAfter(sheet.getMaxRows(), end - sheet.getMaxRows());
      // Copy only the template's formatting/validation, never existing values or formulas.
      sheet.getRange(2, 1, 1, 9).copyTo(sheet.getRange(start, 1, rows.length, 9), SpreadsheetApp.CopyPasteType.PASTE_FORMAT, false);
      sheet.getRange(2, 6).copyTo(sheet.getRange(start, 6, rows.length, 1), SpreadsheetApp.CopyPasteType.PASTE_DATA_VALIDATION, false);
      // Apostrophe prefix prevents untrusted addresses from becoming Sheets formulas.
      sheet.getRange(start, 1, rows.length, 9).setValues(rows.map(row => row.map(value => typeof value === 'string' && /^[=+\-@]/.test(value) ? "'" + value : value)));
      const filter = sheet.getFilter();
      if (filter && end > filter.getRange().getLastRow()) {
        // Don't remove user filter criteria. A manager can expand the existing filter.
        console.warn('New rows extend beyond the filter range; expand the filter in Google Sheets.');
      }
      SpreadsheetApp.flush();
    }
    properties.setProperty('WAITLIST_SYNC_THROUGH_MS', String(started));
    properties.setProperty('WAITLIST_LAST_SUCCESS_ISO', new Date().toISOString());
    console.log(`Waitlist sync complete: ${rows.length} new registrations. No email addresses logged.`);
  } finally { lock.releaseLock(); }
}

function parseWaitlistMessage(message) {
  const headers = message.payload && message.payload.headers || [];
  const header = name => (headers.find(item => item.name.toLowerCase() === name.toLowerCase()) || {}).value || '';
  const from = header('From').trim().toLowerCase();
  if (from !== 'noreply@ezeetech.tw' && !/<noreply@ezeetech\.tw>\s*$/.test(from)) return null;
  if (header('Subject') !== 'Composita OS Waitlist｜新登記') return null;
  const plain = collectWaitlistPlainText(message.payload);
  const match = plain.match(/^Gmail:\s*([^\r\n]+)$/m);
  if (!match || !/^同意接收搶先體驗與產品上線通知:\s*是\s*$/m.test(plain)) return null;
  const email = match[1].trim().toLowerCase();
  if (email.length > 254 || !/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@gmail\.com$/i.test(email)) return null;
  const timestamp = Number(message.internalDate);
  if (!Number.isFinite(timestamp) || timestamp <= 0) return null;
  return { email, timestamp, language: /^語言:\s*English\s*$/m.test(plain) ? 'English' : 'Traditional Chinese' };
}

function collectWaitlistPlainText(part) {
  if (!part) return '';
  const own = part.mimeType === 'text/plain' && part.body && part.body.data
    ? Utilities.newBlob(Utilities.base64DecodeWebSafe(part.body.data)).getDataAsString('UTF-8') : '';
  return [own, ...(part.parts || []).map(collectWaitlistPlainText)].filter(Boolean).join('\n');
}

function waitlistEmailKey(email) {
  // Gmail ignores dots and plus tags for the same inbox.
  return String(email).trim().toLowerCase().replace(/\+[^@]*(?=@)/, '').replace(/\.(?=[^@]*@)/g, '');
}
