import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const headers = ['Registered at', 'Gmail', 'Product', 'Language', 'Consent', 'Status', 'Contacted at', 'Source', 'Notes'];
let rows, messages, propertyMap, fail, profile, pageCalls, triggerCount, triggerExists;
const makeMessage = (email, changes = {}) => ({
  id: email, internalDate: '1794300000000', payload: {
    mimeType: 'multipart/alternative', headers: [{ name: 'From', value: 'noreply@ezeetech.tw' }, { name: 'Subject', value: 'Composita OS Waitlist｜新登記' }],
    parts: [{ mimeType: 'text/plain', body: { data: Buffer.from(`Gmail: ${email}\n產品: Composita OS\n同意接收搶先體驗與產品上線通知: 是\n語言: English\n`).toString('base64url') } }],
  }, ...changes,
});
const sheet = {
  getLastRow: () => rows.length,
  getMaxRows: () => 1000,
  getFilter: () => ({ getRange: () => ({ getLastRow: () => 1000 }) }),
  getRange: (row, col, count = 1, width = 1) => ({
    getValues: () => rows.slice(row - 1, row - 1 + count).map(line => line.slice(col - 1, col - 1 + width)),
    copyTo: () => {},
    setValues: values => { for (let i = 0; i < values.length; i++) rows[row - 1 + i] = values[i]; },
  }),
};
const book = { getId: () => '1c4l8j4qF3yo3V_N6J_8QVs5ydnwOjPd47ZCJQMj0ZAs', getSheetByName: name => name === 'Waitlist' ? sheet : null };
const context = vm.createContext({
  console, Date, Set,
  SpreadsheetApp: { getActiveSpreadsheet: () => book, flush: () => {}, CopyPasteType: { PASTE_FORMAT: 'format', PASTE_DATA_VALIDATION: 'validation' } },
  LockService: { getScriptLock: () => ({ tryLock: () => true, releaseLock: () => {} }) },
  PropertiesService: { getScriptProperties: () => ({ getProperty: key => propertyMap[key], setProperty: (key, value) => { propertyMap[key] = value; } }) },
  Utilities: { base64DecodeWebSafe: data => Buffer.from(data, 'base64url'), newBlob: bytes => ({ getDataAsString: () => bytes.toString('utf8') }) },
  Gmail: { Users: { getProfile: () => ({ emailAddress: profile }), Messages: {
    list: (user, options) => { assert.equal(user, 'me'); assert.ok(options.q.startsWith('from:noreply@ezeetech.tw subject:"Composita OS Waitlist"')); pageCalls++; return options.pageToken ? { messages: messages.slice(1).map(m => ({ id: m.id })) } : { messages: messages.slice(0, 1).map(m => ({ id: m.id })), ...(messages.length > 1 ? { nextPageToken: 'next' } : {}) }; },
    get: (user, id) => { if (fail) throw Error('mock Gmail outage'); return messages.find(message => message.id === id); },
  } } },
  ScriptApp: {
    getProjectTriggers: () => triggerExists ? [{ getHandlerFunction: () => 'syncWaitlist' }] : [],
    newTrigger: name => { assert.equal(name, 'syncWaitlist'); return { timeBased: () => ({ everyMinutes: minutes => { assert.equal(minutes, 5); return { create: () => { triggerCount++; triggerExists = true; } }; } }) }; },
  },
});
vm.runInContext(fs.readFileSync('integrations/waitlist-sheets/Code.gs', 'utf8'), context);
const reset = () => { rows = [headers]; messages = []; propertyMap = {}; fail = false; profile = 'info@ezeetech.tw'; pageCalls = 0; triggerCount = 0; triggerExists = false; };
reset();
assert.equal(context.waitlistEmailKey('Ex.am.ple+tag@gmail.com'), 'example@gmail.com');
assert.equal(context.parseWaitlistMessage(makeMessage('example@gmail.com')).language, 'English');
assert.equal(context.parseWaitlistMessage(makeMessage('a@example.com')), null);
const untrusted = makeMessage('example@gmail.com'); untrusted.payload.headers[0].value = 'other@example.com';
assert.equal(context.parseWaitlistMessage(untrusted), null);
messages = [makeMessage('example@gmail.com'), makeMessage('ex.ample+tag@gmail.com'), makeMessage('second@gmail.com')];
context.syncWaitlist();
assert.equal(rows.length, 3); assert.equal(pageCalls, 2); assert.ok(propertyMap.WAITLIST_LAST_SUCCESS_ISO);
assert.equal(rows[1][0].getTime(), 1794300000000); assert.equal(rows[1][5], 'New');
rows[1][5] = 'Unsubscribed'; rows[1][8] = 'Preserve this note';
context.syncWaitlist(); assert.equal(rows.length, 3); assert.equal(rows[1][5], 'Unsubscribed'); assert.equal(rows[1][8], 'Preserve this note');
context.setupWaitlistSync(); context.setupWaitlistSync(); assert.equal(triggerCount, 1);
reset(); profile = 'wrong@example.com'; assert.throws(() => context.setupWaitlistSync(), /info@ezeetech.tw/); assert.equal(triggerCount, 0);
reset(); fail = true; messages = [makeMessage('example@gmail.com')]; assert.throws(() => context.syncWaitlist(), /outage/); assert.equal(rows.length, 1); assert.equal(propertyMap.WAITLIST_SYNC_THROUGH_MS, undefined);
const manifest = JSON.parse(fs.readFileSync('integrations/waitlist-sheets/appsscript.json', 'utf8'));
assert.deepEqual(manifest.oauthScopes.sort(), ['https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/spreadsheets.currentonly', 'https://www.googleapis.com/auth/script.scriptapp'].sort());
console.log('PASS: genuine-notification parsing, pagination, Gmail aliases, retries, manual-note preservation, correct account, one schedule and read-only Gmail scopes. All Google services mocked.');
