import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, minlength: 3, required: true },
  firstName: String,
  otherName: String,
  msisdn: { type: String, minlength: 9, maxlength: 14, required: true },
  password: String,
  countryCode: { type: String, uppercase: true, default: 'GH' },
  isoCode: { type: String, default: '233' },
  email: String,
  gender: String
});

const User = mongoose.model('User', userSchema);

export default User;
