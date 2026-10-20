import Image from "next/image";

const photos = {
  drone: { alt: "藍天下飛行的四軸無人機", position: "50% 50%" },
  robotics: { alt: "工業環境中的白色機械手臂", position: "35% 50%" },
  autonomous: { alt: "自主配送機器人的輪式移動底盤", position: "50% 88%" },
  research: { alt: "技術人員檢視電路板原型", position: "50% 50%" },
  mobility: { alt: "車輛行駛於沿海道路", position: "50% 52%" },
};

export function ApplicationPhoto({ kind }: { kind: keyof typeof photos }) {
  const photo = photos[kind];
  return <div className="application-photo"><Image src={`/images/applications/${kind}.jpg`} alt={photo.alt} fill sizes="(min-width: 1280px) 280px, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" style={{ objectFit: "cover", objectPosition: photo.position }} /></div>;
}
