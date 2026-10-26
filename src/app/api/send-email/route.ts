import { Resend } from "resend";
import { inquiryTypes, isInquiryType, validateInquiry } from "@/lib/inquiry";
export async function POST(request: Request) {
 try {
  if (Number(request.headers.get("content-length")) > 32000) return Response.json({error:"詢問內容過長。"}, {status:413});
  const raw=await request.text();
  if(raw.length>32000) return Response.json({error:"詢問內容過長。"}, {status:413});
  let data: Record<string,unknown>;
  try { data=JSON.parse(raw); } catch { return Response.json({error:"資料格式錯誤。"}, {status:400}); }
  const validation=validateInquiry(data);
  if(validation) return Response.json({error:validation},{status:400});
  if(data.website) return Response.json({error:"無法受理此詢問。"}, {status:400});
  if(!process.env.RESEND_API_KEY) return Response.json({error:"線上寄信服務尚未啟用。請寄信至 info@ezeetech.tw，您的資料尚未送出。"},{status:503});
  const type=isInquiryType(data.inquiryType)?data.inquiryType:"other";
  const labels:Record<string,string>={name:"姓名",company:"公司",email:"Email",projectDescription:"專案描述",componentType:"零件類型",developmentStage:"開發階段",applicationType:"車輛 / 應用類型",partnershipObjective:"合作目標",technicalRequirements:"技術需求",additionalInfo:"其他資訊"};
  const fields=["name","company","email","projectDescription",...(type==="composita"?["componentType","developmentStage"]:type==="ssers"?["applicationType","partnershipObjective","technicalRequirements"]:[]),"additionalInfo"];
  const text=[`詢問類型：${inquiryTypes[type]}`,...fields.map(key=>`${labels[key]}：${typeof data[key]==="string"?data[key]:""}`),...(type==="composita"?[`需求服務：${(data.services as string[]).join("、")}`]:[])].join("\n\n");
  const result=await new Resend(process.env.RESEND_API_KEY).emails.send({
   from:"noreply@ezeetech.tw",
   to:["info@ezeetech.tw","info.ezeetech.sustain@gmail.com","ezeetech.2025@gmail.com"],
   replyTo:data.email as string,subject:`網站詢問｜${inquiryTypes[type]}`,text,
  });
  if(result.error || !result.data?.id) return Response.json({error:"寄送未完成，請稍後重試或直接來信 info@ezeetech.tw。"},{status:502});
  return Response.json({success:true});
 } catch { return Response.json({error:"目前無法送出，請稍後重試或直接來信 info@ezeetech.tw。"},{status:500}); }
}
