export function validateEmail(email) {
  if (!email) return true;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validateUrl(url) {
  if (!url) return true;
  try {
    const formatted = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
    new URL(formatted);
    return true;
  } catch {
    return false;
  }
}

export function validatePersonal(personal) {
  const errors = {};
  if (!personal?.fullName?.trim()) {
    errors.fullName = 'Full name is required';
  }
  if (personal?.email && !validateEmail(personal.email)) {
    errors.email = 'Please enter a valid email address';
  }
  if (personal?.linkedin && !validateUrl(personal.linkedin)) {
    errors.linkedin = 'Please enter a valid URL';
  }
  if (personal?.github && !validateUrl(personal.github)) {
    errors.github = 'Please enter a valid URL';
  }
  if (personal?.portfolio && !validateUrl(personal.portfolio)) {
    errors.portfolio = 'Please enter a valid URL';
  }
  return errors;
}

