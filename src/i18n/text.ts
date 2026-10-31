import en from './en.json';
const english = (text: string): string => (en as Record<string, string>)[text] ?? text;
const chinese = (text: string): string => text;
export function translator(locale: string) { return locale === 'en' ? english : chinese; }
