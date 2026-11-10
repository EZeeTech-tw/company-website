"use client";
import { useLocale } from 'next-intl';
import { usePathname, getPathname } from '@/i18n/navigation';
import { useEffect, useState } from 'react';
export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const [pending, setPending] = useState(false);
  useEffect(() => {
    const restored = () => setPending(false);
    window.addEventListener('pageshow', restored);
    return () => window.removeEventListener('pageshow', restored);
  }, []);
  function switchTo(next: 'zh' | 'en') {
    // Preserve query parameters and section anchors, including contact inquiry type.
    setPending(true);
    // A browser preference is written only in this user-triggered event, never during render.
    // eslint-disable-next-line react-hooks/immutability
    document.cookie = `site-language=${next}; Path=/; Max-Age=31536000; SameSite=Lax${window.location.protocol === 'https:' ? '; Secure' : ''}`;
    // Reload the document so the root html language, provider and shared navigation
    // all switch together; Next otherwise retains the root layout during navigation.
    window.location.assign(`${getPathname({href:pathname,locale:next})}${window.location.search}${window.location.hash}`);
  }
  return <div className="language-switcher" role="group" aria-label={locale === 'en' ? 'Language' : '語言'} aria-busy={pending}>
    {(['en','zh'] as const).map(lang => <button key={lang} type="button" lang={lang === 'zh' ? 'zh-Hant' : 'en'} aria-label={lang === 'zh' ? '切換繁體中文' : 'Switch to English'} aria-pressed={locale === lang} disabled={pending || locale === lang} onClick={() => switchTo(lang)}>{lang.toUpperCase()}</button>)}
  </div>;
}
