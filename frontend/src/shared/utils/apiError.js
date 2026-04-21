export function getApiErrorMessage(error) {
  const fallback = 'Something went wrong. Please try again.';

  if (!error?.response?.data) {
    return error?.message || fallback;
  }

  const { data } = error.response;

  if (typeof data === 'string') {
    return data;
  }

  if (data.detail) {
    return data.detail;
  }

  const firstKey = Object.keys(data)[0];
  if (!firstKey) {
    return fallback;
  }

  const value = data[firstKey];
  if (Array.isArray(value) && value.length > 0) {
    return `${firstKey}: ${value[0]}`;
  }
  if (typeof value === 'string') {
    return `${firstKey}: ${value}`;
  }

  return fallback;
}
