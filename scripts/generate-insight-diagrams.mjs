import fs from 'node:fs';
const out='public/insights';fs.mkdirSync(out,{recursive:true});
const text=(x,y,s,size=20,color='#cbd5e1')=>`<text x="${x}" y="${y}" font-size="${size}" fill="${color}" font-family="Arial,sans-serif">${s}</text>`;
const box=(x,y,w,h,label)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="#17243a" stroke="#3b5680"/>${text(x+24,y+40,label,20,'#f8fafc')}`;
const arrow=(x,y,w=65)=>`<path d="M${x} ${y}h${w}" stroke="#60a5fa" stroke-width="3" marker-end="url(#arrow)"/>`;
const line=(x1,y1,x2,y2,color='#60a5fa',width=4)=>`<path d="M${x1} ${y1}L${x2} ${y2}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round"/>`;
function save(slug,kicker,title,content){fs.writeFileSync(`${out}/${slug}.svg`,`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="640" viewBox="0 0 1200 640"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#1b2b44" stroke-width="1"/></pattern><marker id="arrow" markerWidth="10" markerHeight="8" refX="8" refY="4" orient="auto"><path d="M0 0L8 4L0 8" fill="none" stroke="#60a5fa" stroke-width="1.5"/></marker></defs><rect width="1200" height="640" fill="#0b1220"/><rect width="1200" height="640" fill="url(#grid)"/>${text(56,60,kicker,15,'#93c5fd')}${text(56,110,title,32,'#f8fafc')}${content}${text(56,606,'COMPOSITA / ENGINEERING INSIGHTS',14,'#64748b')}${text(910,606,'CONCEPT DIAGRAM',14,'#64748b')}</svg>`);}

save('carbon-fiber-vs-aluminum','01 / MATERIAL SELECTION','Design for the same job. Compare the whole structure.',
box(64,170,460,310,'CARBON-FIBER COMPOSITE')+box(676,170,460,310,'ALUMINUM')+
Array.from({length:6},(_,i)=>line(100,260+i*22,480,260+i*22,i%2?'#3b82f6':'#64748b',10)).join('')+
`<path d="M730 250h330v160H730zM750 270v120h290V270z" fill="#94a3b8" fill-rule="evenodd"/>`+
text(100,450,'Layup / direction / process',19)+text(710,450,'Alloy / section / process',19)+
box(432,507,336,55,'LOADS + JOINTS + VALIDATION'));

save('composite-analysis-workflow','02 / ANALYSIS WORKFLOW','One traceable path from requirements to evidence.',
['REQUIREMENTS','CAD + MESH','MATERIAL + LAYUP'].map((s,i)=>box(56+i*390,205,310,95,s)).join('')+arrow(376,252,55)+arrow(766,252,55)+
['VALIDATION','FAILURE REVIEW','SOLVE'].map((s,i)=>box(56+i*390,415,310,95,s)).join('')+
`<path d="M992 312v68" stroke="#60a5fa" stroke-width="3" marker-end="url(#arrow)"/>`+
`<path d="M822 460h-55M432 460h-55" stroke="#60a5fa" stroke-width="3" marker-end="url(#arrow)"/>`+
text(56,355,'Versioned inputs. Explicit assumptions. Reviewable results.',22));

save('outsourcing-composite-engineering','03 / PROJECT HANDOFF','A clear brief makes engineering work reviewable.',
box(72,190,450,335,'PROJECT INPUTS')+['01   CAD + INTERFACES','02   LOAD CASES','03   MATERIAL + PROCESS','04   ACCEPTANCE CRITERIA'].map((s,i)=>text(110,285+i*58,s,22)).join('')+
arrow(550,350,82)+box(678,190,450,335,'ENGINEERING DELIVERABLES')+['DESIGN OPTIONS','ANALYSIS + ASSUMPTIONS','DRAWINGS + LAYUP','TEST + REVIEW PLAN'].map((s,i)=>text(714,285+i*58,s,22)).join(''));

save('uav-carbon-fiber-frame-design','04 / UAV STRUCTURES','Follow the loads through the arms and interfaces.',
line(390,275,800,470,'#334155',35)+line(800,275,390,470,'#334155',35)+
`<rect x="505" y="306" width="180" height="125" rx="20" fill="#1e3a5f" stroke="#60a5fa" stroke-width="3"/>`+
[[390,275],[800,275],[390,470],[800,470]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="68" fill="none" stroke="#64748b" stroke-width="2"/><circle cx="${x}" cy="${y}" r="16" fill="#60a5fa"/>${line(x-48,y,x+48,y,'#93c5fd',6)}`).join('')+
text(96,250,'THRUST',20)+line(240,245,335,270)+text(890,385,'INTERFACE',20)+line(875,375,690,360)+text(80,490,'ARM STIFFNESS',20)+line(260,485,330,470)+text(920,510,'PAYLOAD',20)+line(905,500,630,435));

save('composite-layup-angles','05 / LAMINATE DESIGN','Same material. Different directions. Different response.',
['0°','+45°','−45°','90°'].map((label,i)=>{const y=210+i*73;return `<path d="M340 ${y}l340 -35 150 60 -340 35z" fill="${['#1e3a5f','#244970','#31547b','#45617f'][i]}" stroke="#93c5fd" stroke-width="2"/>${text(900,y+25,label,28,'#f8fafc')}${line(833,y+20,875,y+20)}`;}).join('')+
text(65,290,'REFERENCE AXIS',20)+arrow(70,325,160)+text(65,395,'PLY ORDER',20)+text(65,430,'MATTERS',20)+text(340,555,'Orientation + thickness + stacking sequence',21));

save('composite-fea-mistakes','06 / MODEL REVIEW','A completed solve is the start of the review.',
['ORIENTATION','UNITS + DATA','SUPPORTS','MESH','FAILURE MODE','MODEL SCOPE','TRACEABILITY'].map((s,i)=>{const x=i<4?58+i*287:200+(i-4)*287;const y=i<4?205:375;return box(x,y,255,115,s)+text(x+24,y+87,String(i+1).padStart(2,'0'),26,'#60a5fa');}).join(''));

save('carbon-fiber-robot-structures','07 / ROBOT STRUCTURES','Assess mass, stiffness and precision together.',
`<path d="M400 510h350M465 510v-90l120-145 170 100 105-125" fill="none" stroke="#334155" stroke-width="48" stroke-linejoin="round"/>`+
`<path d="M465 420l120-145 170 100 105-125" fill="none" stroke="#60a5fa" stroke-width="8"/>`+
[[465,420],[585,275],[755,375],[860,250]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="24" fill="#0b1220" stroke="#93c5fd" stroke-width="5"/>`).join('')+
text(70,230,'LOAD-BEARING LINK',20)+line(310,235,540,315)+text(70,420,'JOINT COMPLIANCE',20)+line(315,415,435,420)+text(875,180,'TOOL POSITION',20)+line(950,195,875,225)+text(800,525,'MASS + INERTIA',20));

save('ai-agent-composite-analysis','08 / ENGINEERING AUTOMATION','Automate the handoffs. Keep engineering checkpoints.',
box(56,230,260,110,'STRUCTURED INPUTS')+arrow(328,284,65)+box(412,205,365,160,'AGENT / ORCHESTRATION')+text(436,315,'Checks · versions · tool calls',20)+arrow(790,284,65)+box(880,230,264,110,'SOLVER + RESULTS')+
box(412,430,365,95,'ENGINEERING REVIEW')+
`<path d="M595 375v44" stroke="#60a5fa" stroke-width="3" marker-end="url(#arrow)"/><path d="M1008 355v120H790" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)"/>`);
