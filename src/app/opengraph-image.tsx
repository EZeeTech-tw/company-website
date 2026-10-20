import { ImageResponse } from "next/og";
export const alt="EZeeTech — Advanced Engineering Technologies";
export const size={width:1200,height:630};
export const contentType="image/png";
export default function Image(){return new ImageResponse(<div style={{display:"flex",flexDirection:"column",justifyContent:"space-between",width:"100%",height:"100%",background:"#0B1220",color:"#F8FAFC",padding:"70px",fontFamily:"sans-serif"}}><div style={{display:"flex",fontSize:32,color:"#93C5FD"}}>EZeeTech / ADVANCED ENGINEERING TECHNOLOGIES</div><div style={{display:"flex",fontSize:76,fontWeight:700,lineHeight:1.1}}>Engineering Ideas.<br/>Delivering Impact.</div><div style={{display:"flex",borderTop:"2px solid #2563EB",paddingTop:30,fontSize:27,gap:70}}><span>CompositERA / Composite Engineering</span><span>SSERS / Energy Recovery</span></div></div>,size);}
