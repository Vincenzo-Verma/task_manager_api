import DOMPurify from 'dompurify';

export function sanitizeText(value) {
  return DOMPurify.sanitize(String(value ?? ''), {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  }).trim();
}

export function sanitizeObject(values) {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => {
      if (typeof value === 'string') {
        return [key, sanitizeText(value)];
      }
      return [key, value];
    }),
  );
}
