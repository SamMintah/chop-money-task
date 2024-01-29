import crypto from 'crypto';

function generateResetToken() {
  const token = crypto.randomBytes(20).toString('hex');
  return token;
}

function validateResetToken(token) {
  // Check if the token is a non-empty string of the expected length
  const isValid =
    typeof token === 'string' && token.length === 40 && /^[a-f0-9]+$/i.test(token);

  return isValid;
}

export { generateResetToken, validateResetToken };
