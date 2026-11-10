"""Generate the public Composita sample package. Requires reportlab and pypdf.
Run with the bundled Codex Python runtime, or a Python environment with these dependencies.
All dimensional values below are illustrative inputs, not measured product data.
"""
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.platypus import Paragraph, Table, TableStyle
from reportlab.lib.styles import ParagraphStyle
from pypdf import PdfReader

OUT = Path(__file__).resolve().parents[1] / 'public' / 'downloads'
OUT.mkdir(parents=True, exist_ok=True)
W, H = A4
NAVY, BLUE, MUTED, LINE, PALE = map(HexColor, ['#0b1220','#2563eb','#52627a','#dce4ef','#eff5ff'])
M = 42
STYLE = ParagraphStyle('body',fontName='Helvetica',fontSize=9,leading=13,textColor=NAVY)
SMALL = ParagraphStyle('small',parent=STYLE,fontSize=8,leading=11)
WHITE = ParagraphStyle('header',parent=SMALL,textColor=white,fontName='Helvetica-Bold')
angles = [0,45,-45,90,90,-45,45,0]
thickness = .25
assert angles == angles[::-1] and angles.count(45) == angles.count(-45)
assert len(angles)*thickness == 2

def text(c, value, x, y, width=W-2*M, style=STYLE):
    item=Paragraph(value,style); _,height=item.wrap(width,H)
    item.drawOn(c,x,y-height)
    return y-height

def title(c, doc_id, heading, subheading, page, pages):
    c.setFillColor(NAVY);c.rect(0,H-133,W,133,fill=1,stroke=0)
    c.setFillColor(HexColor('#93c5fd'));c.setFont('Helvetica-Bold',9)
    c.drawString(M,H-32,'EZeeTech / COMPOSITA / ENGINEERING SAMPLE')
    c.setFillColor(white);c.setFont('Helvetica-Bold',23);c.drawString(M,H-68,heading)
    text(c,subheading,M,H-84,W-2*M,ParagraphStyle('sub',parent=SMALL,textColor=HexColor('#cbd5e1')))
    c.setStrokeColor(LINE);c.line(M,39,W-M,39)
    c.setFont('Helvetica',7);c.setFillColor(MUTED)
    c.drawString(M,26,f'{doc_id} | REV A | DEMONSTRATION - NOT RELEASED FOR MANUFACTURE')
    c.drawRightString(W-M,26,f'{page} / {pages}')
    return H-155

def label(c, name, y):
    c.setFont('Helvetica-Bold',12);c.setFillColor(NAVY);c.drawString(M,y,name)
    return y-12

def table(c, rows, widths, y):
    wrapped=[[Paragraph(str(v),WHITE if i==0 else SMALL) for v in row] for i,row in enumerate(rows)]
    t=Table(wrapped,colWidths=widths,hAlign='LEFT')
    t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),NAVY),('VALIGN',(0,0),(-1,-1),'TOP'),('TOPPADDING',(0,0),(-1,-1),8),('BOTTOMPADDING',(0,0),(-1,-1),8),('LEFTPADDING',(0,0),(-1,-1),9),('RIGHTPADDING',(0,0),(-1,-1),9),('ROWBACKGROUNDS',(0,1),(-1,-1),[white,HexColor('#f4f7fb')]),('LINEBELOW',(0,0),(-1,-1),.4,LINE)]))
    _,height=t.wrap(W-2*M,H);assert y-height>53,('Table overflows',y,height)
    t.drawOn(c,M,y-height)
    return y-height-20

def note(c, content, y):
    item=Paragraph(content,SMALL);_,h=item.wrap(W-2*M-24,H)
    c.setFillColor(PALE);c.roundRect(M,y-h-22,W-2*M,h+22,7,fill=1,stroke=0)
    item.drawOn(c,M+12,y-h-11)
    return y-h-36

def make(name):
    c=canvas.Canvas(str(OUT/name),pagesize=A4)
    c.setAuthor('EZeeTech / Composita');c.setTitle(name.replace('-',' ').replace('.pdf',''))
    return c

c=make('composita-sample-engineering-report.pdf')
y=title(c,'CMP-DEMO-RPT-001','An engineering review, made visible.','Illustrative flat laminate | Model definition and analysis readiness | English',1,2)
y=note(c,'<b>What this sample shows:</b> how engineering inputs, assumptions and review gates can be documented. No solver run or physical test has been performed. This is a worked documentation example, not a customer case or an approved design.',y)
y=label(c,'01 / The illustrative brief',y)
y=text(c,'Define a flat, constant-thickness laminate so a reviewer can trace geometry, ply directions and the information needed before analysis. The reference shape is an unnotched rectangular plate; it does not represent a flight-ready UAV component.',M,y)-18
y=table(c,[['Definition','Illustrative input'],['Reference geometry','160 mm (x) x 30 mm (y); no holes, ply drops or core'],['Laminate','[0/+45/-45/90]s; 8 identical-material UD plies'],['Thickness','0.250 mm per ply; nominal total 2.000 mm'],['Material status','No supplier, grade, elastic constants or strength allowables selected'],['Loading / support','A cantilever idealization is proposed for discussion only. Applied load, load distribution and fixture representation remain to be agreed.']], [132,W-2*M-132],y)
y=label(c,'02 / Geometry and coordinate convention',y)
# Original vector schematic. No force magnitude or simulation data implied.
base=y-95
c.setFillColor(PALE);c.setStrokeColor(BLUE);c.rect(M+35,base+18,330,62,fill=1,stroke=1)
c.setFillColor(NAVY);c.setFont('Helvetica',8);c.drawString(M+145,base+42,'ILLUSTRATIVE PLATE')
for k in range(7):
    c.setStrokeColor(MUTED);c.line(M+27,base+18+k*10,M+35,base+26+k*10)
c.setStrokeColor(NAVY);c.line(M+35,base+8,M+365,base+8)
c.setFont('Helvetica',8);c.drawCentredString(M+200,base-4,'160 mm along +x')
c.setStrokeColor(BLUE);c.line(M+395,base+18,M+440,base+18);c.line(M+395,base+18,M+395,base+63)
c.setFillColor(BLUE);c.drawString(M+444,base+15,'+x');c.drawString(M+389,base+69,'+y')
c.drawString(M+389,base-4,'+z out of page')
y=base-22
y=text(c,'Schematic only. The hatched edge indicates a proposed restraint, not an approved fixture or boundary condition. See CMP-DEMO-LAY-001 for the complete ply order.',M,y,style=SMALL)
assert y>65
c.showPage()
y=title(c,'CMP-DEMO-RPT-001','What is ready. What is not.','Analysis readiness is recorded separately from engineering conclusions.',2,2)
y=table(c,[['Review item','Evidence / required next action','Status'],['Geometry & layup','Dimensions and all 8 plies are defined for this documentation example. No released CAD model is included.','Illustrative'],['Material data','Obtain traceable E1, E2, G12, nu12 and applicable strength data for the actual system, process and environment.','Not supplied'],['Loads & restraints','Agree magnitudes, directions, distribution, supports, interfaces and acceptance conditions.','Not defined'],['Model approach','Select shell / solid idealization. Check ply reference axis, shell normal, offsets, units and thickness mapping.','Not built'],['Numerical verification','Check equilibrium, mesh sensitivity, boundary effects and an appropriate analytical benchmark.','Not performed'],['Failure assessment','Select criterion and allowables for the intended failure modes. First-ply indication is not an ultimate-load claim.','Not performed'],['Physical validation','Agree coupon / component tests and acceptance criteria. Correlate the model against relevant measurements.','Not performed']], [100,305,106.2756],y)
y=label(c,'03 / Checks actually completed in this example',y)
y=text(c,'The explicit sequence is 0, +45, -45, 90, 90, -45, +45, 0 degrees. It is symmetric about its mid-plane and has two plies at each listed direction. Nominal thickness is 8 x 0.250 = 2.000 mm. These are definition checks; they do not establish strength, stiffness targets or manufacturing suitability.',M,y)-18
y=label(c,'04 / Decision and release gate',y)
y=text(c,'<b>Decision: not ready for design approval or manufacture.</b> Resolve the missing material, loading and acceptance inputs; build and verify the model; then agree the validation and independent review needed for the application. There is no numerical stress, displacement, safety factor or pass/fail result in this sample.',M,y)-18
y=label(c,'Technical reference',y)
y=text(c,'A. T. Nettles, <i>Basic Mechanics of Laminated Composite Plates</i>, NASA RP-1351 (1994). Used for laminate mechanics and notation; this reference does not cover laminate strength. Example dimensions and ply thickness were chosen solely for this sample, not taken from a material datasheet.<br/><link href="https://ntrs.nasa.gov/citations/19950009349" color="#2563eb">ntrs.nasa.gov/citations/19950009349</link>',M,y,style=SMALL)
assert y>53
c.save()

c=make('composita-sample-layup-table.pdf')
y=title(c,'CMP-DEMO-LAY-001','Every ply, explicitly defined.','Illustrative layup schedule | Units: mm and degrees | English',1,1)
y=note(c,'<b>DEMONSTRATION ONLY.</b> No material grade, process, tolerance or release authority has been assigned. This schedule is not a manufacturing instruction.',y)
y=text(c,'<b>Part:</b> DEMO-PLATE-001, flat plate 160 x 30 mm. <b>Zone:</b> full plate, constant thickness.<br/><b>Material:</b> identical UD plies assumed; supplier / grade TBD. Nominal cured ply thickness = 0.250 mm (illustrative).<br/><b>Reference:</b> +x along the 160 mm edge, +y along the 30 mm edge, +z normal out of the top face. Positive angles rotate from +x toward +y, viewed from +z.<br/><b>Order:</b> ply 1 starts at the bottom (-z) face; ply 8 ends at the top (+z) face. z = 0 is the laminate mid-plane.',M,y)-18
rows=[['Ply','Angle (deg)','Ply t (mm)','z lower (mm)','z upper (mm)','Coverage']]
for i,a in enumerate(angles):
    rows.append([str(i+1),f'{a:+d}' if a else '0',f'{thickness:.3f}',f'{-1+i*thickness:.3f}',f'{-1+(i+1)*thickness:.3f}','Full plate'])
y=table(c,rows,[38,77,77,95,95,W-2*M-382],y)
y=label(c,'Definition checks',y)
y=text(c,'<b>Compact notation:</b> [0/+45/-45/90]s. Explicit sequence above controls.<br/><b>Ply count:</b> 8. <b>Total nominal thickness:</b> 2.000 mm. <b>Angle counts:</b> 0 = 2; +45 = 2; -45 = 2; 90 = 2.<br/><b>Symmetry:</b> mirrored material, thickness and orientation about z = 0.<br/><b>Balance:</b> equal +45 and -45 content for the assumed identical material and thickness. Symmetry and balance do not by themselves remove all bending-twisting coupling.',M,y)-18
y=text(c,'Before real use: specify qualified material data, cured thickness and tolerances, surface / tool-side convention, ply boundaries, overlaps, splices, drops, process requirements, inspection plan and approval. No cut patterns or process parameters are provided.<br/>Related report: CMP-DEMO-RPT-001. Mechanics reference: NASA RP-1351, <link href="https://ntrs.nasa.gov/citations/19950009349" color="#2563eb">NTRS 19950009349</link>.',M,y,style=SMALL)
assert y>53
c.save()

c=make('composita-sample-delivery-checklist.pdf')
y=title(c,'CMP-DEMO-CHK-001','A handoff you can review.','Illustrative deliverable and acceptance checklist | English',1,1)
y=note(c,'<b>Use:</b> agree deliverables and acceptance evidence before work begins. This package contains the sample report, layup table and this checklist only. The items below describe a possible project handoff; they are not claims of completed work.',y)
rows=[['ID / deliverable','Review / acceptance evidence','This sample']]
items=[
('01 / Design brief','Application, revision, dimensions, units, load cases, interfaces and agreed acceptance conditions.','Illustrative definition only'),
('02 / CAD package','Agreed native / neutral formats; revision and geometry checks; referenced coordinate system.','Not included'),
('03 / Material record','Traceable supplier / grade, process and environment; properties and allowables with sources.','Not included'),
('04 / Layup schedule','Ply IDs, angles, thickness, material, zones, normal and tool-side / stack order; matching model revision.','Sample PDF included'),
('05 / Analysis model','Software / version, units, geometry idealization, mesh, loads, restraints and ply mapping.','Not included'),
('06 / Verification record','Equilibrium, mesh sensitivity, boundary checks and suitable benchmark; unresolved issues recorded.','Not performed'),
('07 / Engineering report','Assumptions, methods, relevant results, limitations and a clearly scoped conclusion.','Definition / readiness sample only'),
('08 / Manufacturing package','Agreed drawings, tolerances, process requirements and inspection criteria, reviewed for manufacture.','Not included'),
('09 / Validation record','Agreed physical test method, measured data, correlation and application-specific acceptance review.','Not performed'),
('10 / Release record','Deliverable index, revisions, open items, reviewer identity and written acceptance by authorized parties.','No approval or release'),
]
rows += [[a,b,d] for a,b,d in items]
y=table(c,rows,[112,290,W-2*M-402],y)
y=text(c,'<b>Acceptance is project-specific.</b> Agree file formats, revision control, review responsibilities and any testing or certification needs in the project scope. Do not mark an item complete solely because a file exists.<br/><b>Discuss your scope:</b> <link href="https://www.ezeetech.tw/services" color="#2563eb">ezeetech.tw/services</link> | info@ezeetech.tw',M,y,style=SMALL)
assert y>53
c.save()

for name,expected in [('composita-sample-engineering-report.pdf',2),('composita-sample-layup-table.pdf',1),('composita-sample-delivery-checklist.pdf',1)]:
    reader=PdfReader(OUT/name)
    assert len(reader.pages)==expected
    content=' '.join(page.extract_text() for page in reader.pages)
    assert 'DEMONSTRATION' in content
    assert len(content)>1000
    print(name,len(reader.pages),'pages', (OUT/name).stat().st_size,'bytes')

import zipfile
with zipfile.ZipFile(OUT/'composita-engineering-sample-pack.zip','w',zipfile.ZIP_DEFLATED) as bundle:
    for name in ['composita-sample-engineering-report.pdf','composita-sample-layup-table.pdf','composita-sample-delivery-checklist.pdf']:
        bundle.write(OUT/name,name)
