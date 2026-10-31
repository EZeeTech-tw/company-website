import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import ts from 'typescript';
const dictionary=JSON.parse(fs.readFileSync('src/i18n/en.json','utf8'));
const news=JSON.parse(fs.readFileSync('src/i18n/news-en.json','utf8'));
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
let checked=0;
for(const file of walk('src').filter(f=>/\.tsx?$/.test(f))) {
  const source=ts.createSourceFile(file,fs.readFileSync(file,'utf8'),ts.ScriptTarget.Latest,true);
  const visit=node=>{
    if(ts.isCallExpression(node)&&node.expression.getText(source)==='t'&&node.arguments.length===1&&ts.isStringLiteral(node.arguments[0])) {
      const key=node.arguments[0].text;
      if(/[\u3400-\u9fff]/.test(key)) {assert.ok(dictionary[key],`Missing translation: ${file}: ${key}`);checked++;}
    }
    ts.forEachChild(node,visit);
  };
  visit(source);
}
for(const file of fs.readdirSync('content/news').filter(f=>f.endsWith('.mdx')))assert.ok(news[file.replace(/\.mdx$/,'')]?.title,`Missing English news title: ${file}`);
console.log(`PASS: ${checked} UI translation references and ${Object.keys(news).length} news translations.`);
if(process.env.TEST_BASE_URL) {
  const base=process.env.TEST_BASE_URL;
  for(const prefix of ['', '/en'])for(const route of ['', '/about','/solutions','/solutions/composita','/solutions/ssers','/technology','/news','/contact']) {
    const url=prefix+route||'/';
    const response=await fetch(base+url);
    assert.equal(response.status,200,url);
    const html=await response.text();
    assert.ok(html.includes(`lang="${prefix?'en':'zh-Hant-TW'}"`),`Wrong document locale: ${url}`);
    const canonical=html.match(/<link rel="canonical" href="([^"]+)"/);
    assert.ok(canonical,`Missing canonical: ${url}`);
    assert.equal(new URL(canonical[1]).pathname,url,`Wrong canonical: ${url}`);
    console.log(`PASS: ${url}`);
  }
  for(const url of ['/en/missing-page','/missing-page','/en/news/missing-article']){
    const response=await fetch(base+url);
    const html=await response.text();
    // App Router can stream a 200 before notFound; it must still emit noindex
    // and the localized not-found UI, never a valid content page.
    assert.ok(response.status===404 || (response.status===200 && /<meta name="robots" content="noindex"/.test(html)),url);
    assert.ok(html.includes(url.startsWith('/en')?'Page not found.':'找不到這個頁面。'),url);
  }
  for(const [from,to] of [['/solutions/compositera','/solutions/composita'],['/en/solutions/compositera','/en/solutions/composita'],['/zh/about','/about']]){
    const response=await fetch(base+from,{redirect:'manual'});
    assert.ok(response.status>=300&&response.status<400,from);
    assert.equal(new URL(response.headers.get('location'),base).pathname,to);
  }
  console.log('PASS: 404 and legacy redirect checks.');
}
