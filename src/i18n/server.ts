import { getLocale } from 'next-intl/server';
import { translator } from './text';
export async function getText() { return translator(await getLocale()); }
