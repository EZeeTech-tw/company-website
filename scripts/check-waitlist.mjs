import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { createHash } from 'node:crypto';

const compile = file => ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const validation = { exports: {} };
vm.runInNewContext(compile('src/lib/waitlist.ts'), { exports: validation.exports });
let calls = 0, fail = false;
const env = { RESEND_API_KEY: 'mock-only' };
const route = { exports: {} };
vm.runInNewContext(compile('src/app/api/waitlist/route.ts'), {
  exports: route.exports, Response, URL, process: { env },
  require: name => name === 'node:crypto' ? { createHash } : name === '@/lib/waitlist' ? validation.exports : {
    Resend: class { emails = { send: async (message, options) => {
      calls++; assert.equal(message.replyTo, 'example@gmail.com');
      assert.ok(message.to.includes('info@ezeetech.tw'));
      assert.ok(options.idempotencyKey.startsWith('waitlist-'));
      return fail ? { error: { message: 'mock failure' } } : { data: { id: 'mock' } };
    } }; },
  },
});
const post = (data, origin = 'https://www.ezeetech.tw') => route.exports.POST(new Request('https://www.ezeetech.tw/api/waitlist', { method: 'POST', headers: { origin }, body: JSON.stringify(data) }));
const valid = { email: ' Example@Gmail.com ', consent: true };
for (const value of [null, [], {}, { ...valid, email: 'a@example.com' }, { ...valid, email: 'a\n@gmail.com' }, { ...valid, consent: false }, { ...valid, website: 'spam' }]) assert.equal((await post(value)).status, 400);
assert.equal((await post(valid, 'https://other.example')).status, 403);
assert.equal(calls, 0);
assert.equal((await post(valid)).status, 200);
fail = true; assert.equal((await post(valid)).status, 502);
delete env.RESEND_API_KEY; assert.equal((await post(valid)).status, 503);
assert.equal(calls, 2);
console.log('PASS: Gmail validation, consent, spam trap, origin, mocked delivery, provider failure and missing configuration. No real email sent.');

if (process.env.TEST_BASE_URL) {
  const base = process.env.TEST_BASE_URL;
  for (const prefix of ['', '/zh']) {
    const response = await fetch(`${base}${prefix}/waitlist`);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.ok(html.includes(`https://www.ezeetech.tw${prefix}/waitlist`));
    assert.ok(html.includes('name="email"') && html.includes('name="consent"'));
    assert.ok(html.includes(prefix ? '搶先一步，收到消息。' : 'Be first to hear.'));
    const home = await (await fetch(`${base}${prefix || '/'}`,{headers:{Cookie:'site-language=zh'}})).text();
    assert.ok(home.includes(`href="${prefix}/waitlist"`));
  }
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  assert.ok(sitemap.includes('/zh/waitlist') && sitemap.includes('tw/waitlist'));
  console.log('PASS: bilingual pages, homepage entries, canonical and sitemap.');
}
