const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  access_token: { type: String, required: true },
  authuser: { type: String, required: true },
  email: {
    type: String,
    unique: [true, 'User already exists'],
    required: true,
  },
  email_verified: { type: Boolean, required: true },
  locale: String,
  name: { type: String, required: true },
  given_name: {
    type: String,
  },
  family_name: {
    type: String,
  },
  picture: { type: String, required: true },
  sub: String,
  token_type: { type: String, required: true },
  // savedProducts: [
  //   { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
  //   { unique: true },
  //   { required: false },
  //   { maxLength: 5 },
  // ],
  savedProducts: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }],
    unique: true,
    required: false,
    validate: {
      validator: function (v) {
        return v.length <= 5;
      },
      message: 'The maximum allowed number of saved products is 5.',
    },
  },
  postedProducts: [{ type: String }, { required: false }],
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
