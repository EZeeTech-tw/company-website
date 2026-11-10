import { getRequestConfig } from 'next-intl/server';
export default getRequestConfig(async ({ requestLocale }) => ({ locale: (await requestLocale) === 'zh' ? 'zh' : 'en', messages: {}, timeZone: 'Asia/Taipei' }));
