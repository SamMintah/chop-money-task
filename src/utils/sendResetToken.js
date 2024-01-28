import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASSWORD
  }
});

async function sendResetTokenEmail(email, resetToken) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset',
      text: `Use this token to reset your password: ${resetToken}`
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(`Error sending reset token email: ${error}`);
    throw error;
  }
}

export { sendResetTokenEmail };
