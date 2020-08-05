const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  languageCode: {
    type: String,
    required: true,
  },
  isBot: {
    type: Boolean,
    required: true,
  },
  message: {
    type: String,
  },
});

module.exports = model("User", userSchema);
