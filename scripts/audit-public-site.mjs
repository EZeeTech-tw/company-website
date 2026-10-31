import assert from 'node:assert/strict';
import fs from 'node:fs';
import matter from 'gray-matter';
const base=process.env.TEST_BASE_URL || 'http://127.0.0.1:3008';
const slugs=fs.readdirSync('content/news').filter(f=>f.endsWith('.mdx'));
const routes=['','/about','/solutions','/solutions/composita','/solutions/ssers','/technology','/news','/contact',...slugs.map(f=>'/news/'+f.replace(/\.mdx$/,''))];
const links=new Set(),assets=new Set();
let pages=0;
for(const prefix of ['','/en'])for(const route of routes){
  const url=prefix+route||'/';
  const response=await fetch(base+url);
  assert.equal(response.status,200,url);
  const html=await response.text();
  assert.ok(!html.includes('NEXT_HTTP_ERROR_FALLBACK;404'),url);
  assert.ok(html.includes(`lang="${prefix?'en':'zh-Hant-TW'}"`),url);
  const content=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'');
  if(route==='/news')for(const file of slugs){const {data}=matter(fs.readFileSync('content/news/'+file,'utf8'));if(!data.hidden)assert.ok(content.includes('/news/'+file.replace(/\.mdx$/,'')),`Missing public news card: ${url}/${file}`);}
  for(const [,href] of content.matchAll(/<a\b[^>]*href="([^"]+)"/g))if(href.startsWith('/')&&!href.startsWith('//'))links.add(href.replaceAll('&amp;','&').split('#')[0]);
  for(const [,src] of content.matchAll(/<img\b[^>]*src="([^"]+)"/g))if(src.startsWith('/'))assets.add(src.replaceAll('&amp;','&'));
  if(prefix && route.startsWith('/news/'))assert.ok(content.includes('The original article below is in Traditional Chinese.'),url);
  pages++;
}
for(const href of links){const response=await fetch(base+href);assert.equal(response.status,200,`Broken internal link: ${href}`);const html=await response.text();assert.ok(!html.includes('NEXT_HTTP_ERROR_FALLBACK;404'),`Soft-404 link: ${href}`);}
for(const src of assets){const response=await fetch(base+src);assert.equal(response.status,200,`Broken image: ${src}`);assert.ok(response.headers.get('content-type')?.startsWith('image/'),`Not an image: ${src}`);await response.arrayBuffer();}
const sitemap=await (await fetch(base+'/sitemap.xml')).text();
for(const file of slugs){const {data}=matter(fs.readFileSync('content/news/'+file,'utf8'));const slug=file.replace(/\.mdx$/,'');assert.equal(sitemap.includes('/news/'+slug),!data.hidden,`Sitemap visibility: ${slug}`);}
// These deliberately invalid requests are rejected before the email service runs.
for(const body of ['{','{}',JSON.stringify({inquiryType:'invalid'})]){const response=await fetch(base+'/api/send-email',{method:'POST',headers:{'Content-Type':'application/json'},body});assert.equal(response.status,400,'Invalid inquiry must be rejected');assert.ok((await response.json()).error);}
for(const endpoint of ['/api/test/put-test','/api/debug/parse-mdx'])assert.equal((await fetch(base+endpoint)).status,404,`Production debug endpoint: ${endpoint}`);
console.log(`PASS: ${pages} bilingual pages, ${links.size} internal links, ${assets.size} images, sitemap visibility, invalid form requests and disabled debug endpoints.`);
