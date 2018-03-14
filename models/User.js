const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  localAuth: {
    username: String,
    password: String,
    email: String
  },
  facebookAuth: {
    id: String,
    firstName: String,
    lastName: String
  },
  googleAuth: {
    id: String,
    name: String
  }
});

mongoose.model("users", userSchema);
