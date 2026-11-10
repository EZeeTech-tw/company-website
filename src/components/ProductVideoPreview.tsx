'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';

/** Silent excerpts from the company's Composita OS film. */
export function ProductVideoPreview({ clip = 'composita-preview', label }: { clip?: 'composita-preview' | 'composita-layup' | 'composita-analysis' | 'composita-manufacturing'; label?: string }) {
  const en = useLocale() === 'en';
  const video = useRef<HTMLVideoElement>(null);
  const pausedByUser = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const sync = () => {
      if (visible && !document.hidden && !reducedMotion.matches && !pausedByUser.current) {
        void element.play().catch(() => { /* The play button remains available if autoplay is blocked. */ });
      } else element.pause();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0.15 });
    observer.observe(element);
    document.addEventListener('visibilitychange', sync);
    reducedMotion.addEventListener('change', sync);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      reducedMotion.removeEventListener('change', sync);
      element.pause();
    };
  }, []);

  function toggle() {
    const element = video.current;
    if (!element) return;
    if (element.paused) {
      pausedByUser.current = false;
      void element.play().catch(() => setFailed(true));
    } else {
      pausedByUser.current = true;
      element.pause();
    }
  }

  return <div className="product-video-preview">
    <video ref={video} muted loop playsInline preload="none" poster={`/media/${clip}.jpg`}
      width={960} height={540} aria-label={label || (en ? 'Composita OS composite analysis — silent preview' : 'Composita OS 複材分析：靜音預覽')}
      onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)}>
      <source src={`/media/${clip}.webm`} type="video/webm"/>
      <source src={`/media/${clip}.mp4`} type="video/mp4"/>
    </video>
    {!failed && <button className="preview-playback" type="button" onClick={toggle} aria-label={playing ? (en ? 'Pause preview' : '暫停預覽') : (en ? 'Play preview' : '播放預覽')}>
      <span aria-hidden="true">{playing ? 'Ⅱ' : '▶'}</span><span>{playing ? (en ? 'Pause' : '暫停') : (en ? 'Play' : '播放')}</span>
    </button>}
    {failed && <a className="preview-fallback" href="https://www.youtube.com/watch?v=hcnYq2N0lOI" target="_blank" rel="noopener noreferrer">{en ? 'Watch the full video on YouTube ↗' : '在 YouTube 觀看完整影片 ↗'}</a>}
  </div>;
}
