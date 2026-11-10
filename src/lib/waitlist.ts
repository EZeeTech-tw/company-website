export function validWaitlistEmail(value: unknown): value is string {
  return typeof value === 'string' && value.length <= 254 && /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@gmail\.com$/i.test(value.trim());
}
