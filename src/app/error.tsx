"use client";
export default function ErrorPage({reset}:{error:Error;reset:()=>void}){return <div className="site-container section-space"><p className="eyebrow">SOMETHING WENT WRONG</p><h1 className="mt-4">內容暫時無法載入。</h1><p className="mt-4 text-slate-600">請重新嘗試，或透過 info@ezeetech.tw 與我們聯繫。</p><button className="btn btn-primary mt-6" onClick={reset}>重新載入</button></div>;}
