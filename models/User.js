const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  localAuth: {
    username: String,
    password: String
  },
  facebookAuth: {
    id: String,
    firstName: String,
    lastName: String
  }
});

mongoose.model("users", userSchema);
