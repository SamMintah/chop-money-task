import crypto from 'crypto';

function generateResetToken() {
  const token = crypto.randomBytes(20).toString('hex');
  return token;
}

export { generateResetToken };
