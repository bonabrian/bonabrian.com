export const trim = (text?: string, maxLength: number = 20): string =>
  (text && text.slice(0, maxLength) + (text.length > maxLength ? '...' : '')) ??
  ''
