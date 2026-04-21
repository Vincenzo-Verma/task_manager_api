export function decodeJwtPayload(token) {
  if (!token || token.split('.').length < 2) {
    return null;
  }

  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const payload = atob(base64);
    return JSON.parse(payload);
  } catch {
    return null;
  }
}

export function getUserIdFromToken(token) {
  const payload = decodeJwtPayload(token);
  return payload?.user_id || null;
}
