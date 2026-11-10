/** Public URLs are stable: English is unprefixed; Traditional Chinese uses /zh. */
export function localePath(path: string, locale: string) {
  const suffix = path === '/' ? '' : path;
  return locale === 'zh' ? `/zh${suffix}` : suffix || '/';
}
