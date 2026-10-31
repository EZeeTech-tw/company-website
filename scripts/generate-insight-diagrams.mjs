import fs from 'node:fs';
import sharp from 'sharp';
const out='public/insights';fs.mkdirSync(out,{recursive:true});
const ink='#172b4d',muted='#677a96',blue='#2563eb';
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;');
const t=(x,y,s,size=20,color=muted,weight=400,anchor='start')=>`<text x="${x}" y="${y}" fill="${color}" font-family="Inter,Arial,sans-serif" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${esc(s)}</text>`;
const p=(d,color=blue,width=2)=>`<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;
const c=(x,y,r,fill,stroke='none')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}"/>`;
const r=(x,y,w,h,fill='#fff',stroke='#e2eaf5',radius=20,extra='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" stroke="${stroke}" ${extra}/>`;
const card=(x,y,w,h)=>r(x,y,w,h,'#fff','#e2eaf5',20,'filter="url(#shadow)"');
const arrow=(x,y,w=80)=>p(`M${x} ${y}h${w}m-8-6 8 6-8 6`,'#93add2');
const tag=(x,y,label,w=150)=>r(x,y,w,34,'#edf4ff','none',17)+t(x+16,y+23,label,14,blue,500);
const icon=(name,x,y,scale=1)=>{
 const shapes={document:'M12 3h16l8 8v30H12zM28 3v10h8M19 22h10M19 29h10M19 36h6',layers:'M4 16 24 5l20 11-20 11zM4 26l20 11 20-11M4 36l20 11 20-11',check:'M10 25 20 35 39 14',target:'M24 4v8M24 36v8M4 24h8M36 24h8M24 16a8 8 0 1 0 0 16 8 8 0 0 0 0-16',grid:'M5 5h38v38H5zM5 18h38M5 31h38M18 5v38M31 5v38',bot:'M10 13h28a6 6 0 0 1 6 6v20H4V19a6 6 0 0 1 6-6M24 13V5M15 24v3M33 24v3M16 34h16'};
 return `<g transform="translate(${x} ${y}) scale(${scale})">${p(shapes[name],blue,2.3)}</g>`;
};
function save(slug,number,kicker,title,subtitle,content){
 fs.writeFileSync(`${out}/${slug}.svg`,`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="640" viewBox="0 0 1200 640"><defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#f8fbff"/><stop offset="1" stop-color="#eaf1fc"/></linearGradient><linearGradient id="metal" x2="0" y2="1"><stop stop-color="#cbd8e9"/><stop offset=".45" stop-color="#f4f7fc"/><stop offset="1" stop-color="#91a6c2"/></linearGradient><linearGradient id="carbon" x2="1" y2="1"><stop stop-color="#19365c"/><stop offset="1" stop-color="#41638c"/></linearGradient><filter id="shadow" x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dy="10" stdDeviation="14" flood-color="#254b83" flood-opacity=".07"/></filter><pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">${c(1,1,1,'#b9cbe4')}</pattern></defs><rect width="1200" height="640" fill="url(#bg)"/><rect x="920" width="280" height="220" fill="url(#dots)" opacity=".45"/>${r(56,49,5,18,blue,'none',2)}${t(75,64,kicker,14,blue,600)}${t(56,122,title,36,ink,600)}${t(56,158,subtitle,18)}${content}${p('M56 573H1144','#d7e2f1',1)}${t(56,609,'Composita',18,ink,650)}${t(165,609,'/  Engineering notes',14)}${t(1144,609,number,14,blue,600,'end')}</svg>`);
}
save('carbon-fiber-vs-aluminum','01','MATERIAL SELECTION','Two materials. One design brief.','Compare the finished structure, including its interfaces.',
card(66,214,500,314)+card(634,214,500,314)+tag(92,238,'CFRP laminate',148)+tag(660,238,'Aluminum',124)+
Array.from({length:6},(_,i)=>`<path d="M154 ${318+i*13}l218-34 91 49-218 34z" fill="${i%2?'#436389':'#203d62'}" stroke="#6c8aae"/>`).join('')+
`<path d="M739 309h260v139H739zM765 334v88h208v-88z" fill="url(#metal)" fill-rule="evenodd" stroke="#a4b7d0"/>`+
t(108,492,'Direction · Layup · Process',18,ink,500)+t(676,492,'Alloy · Section · Process',18,ink,500));
save('composite-analysis-workflow','02','SIMULATION WORKFLOW','From geometry to confidence.','A connected process. A traceable engineering decision.',
['Define','Model','Solve','Validate'].map((s,i)=>{const x=66+i*286;return card(x,243,210,247)+c(x+105,320,43,'#edf4ff')+icon(['target','layers','grid','check'][i],x+81,296)+t(x+105,410,s,23,ink,600,'middle')+t(x+105,448,['Loads & limits','CAD & layup','FEA & results','Test & review'][i],15,muted,400,'middle');}).join('')+[294,580,866].map(x=>arrow(x,355,38)).join(''));
save('outsourcing-composite-engineering','03','PROJECT HANDOFF','A clear brief. A better outcome.','Turn requirements into a scope everyone can review.',
card(66,235,300,290)+card(450,235,300,290)+card(834,235,300,290)+
[[66,'document','Your brief','Geometry + loads','Materials + targets'],[450,'layers','Engineering','Concepts + analysis','Assumptions + decisions'],[834,'check','Deliverables','Drawings + layup','Reports + test plan']].map(([x,name,title,a,b],i)=>c(x+52,293,29,'#edf4ff')+icon(name,x+36,276,.7)+t(x+28,370,title,26,ink,600)+t(x+28,418,a,17)+t(x+28,451,b,17)+t(x+271,278,String(i+1).padStart(2,'0'),13,'#9baec8',500,'end')).join('')+arrow(385,380,44)+arrow(769,380,44));
save('uav-carbon-fiber-frame-design','04','UAV STRUCTURES','Lightweight, with a clear load path.','Look beyond mass: stiffness, joints and integration matter.',
`<ellipse cx="605" cy="462" rx="258" ry="36" fill="#cfddf0" opacity=".45"/>`+p('M405 271 792 460M792 271 405 460','#afc1d9',29)+p('M405 271 792 460M792 271 405 460','#385d8d',18)+
[[405,271],[792,271],[405,460],[792,460]].map(([x,y])=>c(x,y,62,'#fff','#bbcee6')+c(x,y,49,'#edf4ff')+p(`M${x-45} ${y}h90`,blue,4)+c(x,y,10,blue)).join('')+
r(514,304,171,123,'url(#carbon)','#385d8d',26)+p('M547 336h105M547 349h105M547 362h105','#7093bc',1)+tag(80,264,'Motor mount',145)+p('M236 281H324l24-10','#a4b8d5',1.5)+tag(894,355,'Payload',110)+p('M884 371H716','#a4b8d5',1.5)+tag(87,456,'Arm stiffness',145)+p('M244 473h92','#a4b8d5',1.5));
// Each tile shows an individual UD ply orientation relative to x; it is not a layup prescription.
save('composite-layup-angles','05','PLY ORIENTATION','Every ply has a direction.','UD ply angles measured from the reference x-axis.',
[0,45,-45,90].map((angle,i)=>{const x=66+i*286;return card(x,224,210,304)+`<defs><clipPath id="ply-${i}">${r(x+22,255,166,166,'#fff','none',14)}</clipPath></defs>`+r(x+22,255,166,166,'#e7f0fd','none',14)+`<g clip-path="url(#ply-${i})"><g transform="rotate(${-angle} ${x+105} 338)">${Array.from({length:23},(_,j)=>p(`M${x-100} ${160+j*16}h420`,'#4e77ad',3)).join('')}</g></g>`+t(x+105,480,angle>0?`+${angle}°`:`${angle}°`,28,ink,600,'middle');}).join('')+
arrow(510,551,150)+t(676,557,'x',18,blue,500));
save('composite-fea-mistakes','06','MODEL REVIEW','Good results start with good checks.','Seven questions to ask before trusting a contour plot.',
card(397,225,405,310)+icon('grid',531,278,2)+t(600,458,'Review the model',23,ink,600,'middle')+
['Orientation','Units & data','Supports','Mesh'].map((s,i)=>c(96,255+i*69,14,'#e3edfc')+t(96,260+i*69,String(i+1),13,blue,600,'middle')+t(125,261+i*69,s,19,ink,500)+p(`M310 ${255+i*69}h52`,'#c1d0e5',1.5)).join('')+
['Failure modes','Model scope','Traceability'].map((s,i)=>p(`M836 ${285+i*78}h39`,'#c1d0e5',1.5)+c(903,285+i*78,14,'#e3edfc')+t(903,290+i*78,String(i+5),13,blue,600,'middle')+t(930,291+i*78,s,18,ink,500)).join(''));
save('carbon-fiber-robot-structures','07','ROBOT STRUCTURES','Less mass. More considered design.','Balance the link, the joint and the tool position.',
`<ellipse cx="592" cy="519" rx="242" ry="22" fill="#cfddf0" opacity=".6"/>`+r(393,480,330,34,'#b4c6dd','none',12)+p('M470 480v-78l116-145 164 99 86-111','#a0b5d0',45)+p('M470 402l116-145 164 99 86-111','#345b8c',26)+
[[470,402],[586,257],[750,356],[836,245]].map(([x,y])=>c(x,y,26,'#f8fbff','#88a6cc')+c(x,y,11,blue)).join('')+
tag(75,251,'Link stiffness',149)+p('M235 268h103l181 60','#a0b6d3',1.5)+tag(83,428,'Joint compliance',173)+p('M269 445h123l46-29','#a0b6d3',1.5)+tag(914,238,'Tool position',147)+p('M902 255h-28','#a0b6d3',1.5));
save('ai-agent-composite-analysis','08','ENGINEERING AUTOMATION','Connected tools. Clear checkpoints.','Automate repeatable work with engineering oversight.',
card(66,284,253,174)+icon('document',92,307,.65)+t(92,390,'Structured inputs',20,ink,600)+t(92,423,'Requirements + data',15)+
card(441,219,318,290)+c(600,302,41,'#edf4ff')+icon('bot',576,277)+t(600,390,'Agent',29,ink,600,'middle')+t(600,425,'Coordinate · Check · Record',16,muted,400,'middle')+
card(881,230,253,126)+icon('grid',902,251,.58)+t(951,278,'Solver + tools',18,ink,600)+t(903,326,'Models + results',15)+
card(881,395,253,126)+icon('check',902,416,.58)+t(951,443,'Engineer review',18,ink,600)+t(903,491,'Judgment + validation',15)+
arrow(338,368,83)+p('M779 368h40V294h42M819 368v90h42','#93add2'));
// Raster exports are used by social crawlers, which do not consistently accept SVG.
for(const file of fs.readdirSync(out).filter(name=>name.endsWith('.svg'))){
 await sharp(`${out}/${file}`).png().toFile(`${out}/${file.replace('.svg','.png')}`);
}
