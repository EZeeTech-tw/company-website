import { useLocale } from 'next-intl';
import { translator } from './text';
export function useText() { return translator(useLocale()); }
