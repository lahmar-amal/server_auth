const mongoose = require("mongoose");
const { Schema, model } = mongoose;
// Schema of user
// { email , password, name , phone ,...}

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: String,
  phone: Number,
});

module.exports = User = model("user", userSchema);
