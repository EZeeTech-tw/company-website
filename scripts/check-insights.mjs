import fs from 'node:fs';
import assert from 'node:assert/strict';
import ts from 'typescript';
const compiled=ts.transpileModule(fs.readFileSync('src/lib/insights.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {insights}=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'));
assert.equal(insights.length,8);
assert.equal(new Set(insights.map(a=>a.slug)).size,8);
assert.equal(new Set(insights.map(a=>a.date)).size,1,'All articles publish together');
const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Taipei'}).format(new Date());
for(const a of insights){assert.ok(a.date<=today,'No future publication dates');for(const slug of a.related)assert.ok(insights.some(b=>b.slug===slug));for(const locale of ['zh','en']){assert.ok(a[locale].sections.length>=4);assert.ok(a[locale].sections.every(s=>s.paragraphs.length));}for(const reference of a.references)assert.ok(['ocw.mit.edu','ntrs.nasa.gov','standards.nasa.gov'].includes(new URL(reference.url).hostname),'Prefer academic and research references');}
const base=process.env.TEST_BASE_URL;
if(base){
 for(const prefix of ['','/en']){
  const list=await fetch(base+prefix+'/insights');assert.equal(list.status,200);const index=await list.text();
  for(const a of insights){
   assert.ok(index.includes(`${prefix}/insights/${a.slug}`));
   const route=prefix+'/insights/'+a.slug;const r=await fetch(base+route);assert.equal(r.status,200,route);const html=await r.text();
   assert.ok(!html.includes('NEXT_HTTP_ERROR_FALLBACK'));
   assert.ok(html.includes(`lang="${prefix?'en':'zh-Hant-TW'}"`));
   const canonical=html.match(/rel="canonical" href="([^"]+)"/);assert.equal(new URL(canonical[1]).pathname,route);
   const copy=a[prefix?'en':'zh'];assert.ok(html.includes(copy.title));
   const schemas=[...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
   const post=schemas.flatMap(s=>s['@graph']??[s]).find(s=>s['@type']==='BlogPosting');assert.equal(post.headline,copy.title);assert.equal(post.datePublished,a.date);
   const imagePath=`/insights/${a.slug}.png`;
   assert.equal(new URL(post.image).pathname,imagePath);
   assert.ok(html.includes(`property="og:image" content="https://www.ezeetech.tw${imagePath}"`));
   const social=await fetch(base+imagePath);assert.equal(social.status,200);assert.ok(social.headers.get('content-type')?.includes('image/png'));
   const visible=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'');assert.ok(!/Ansys|PyDPF|<time\b|<figcaption\b/i.test(visible),'Keep articles independent and hide publication labels');
   for(let i=1;i<=copy.sections.length;i++)assert.ok(html.includes(`id="section-${i}"`));
   const sitemap=await(await fetch(base+'/sitemap.xml')).text();assert.ok(sitemap.includes(route));
  }
 }
}
console.log('PASS: 8 bilingual articles, complete translations, related links and same-day publishing'+(base?', 18 routes, canonicals, structured data, section anchors and sitemap.':'.'));
