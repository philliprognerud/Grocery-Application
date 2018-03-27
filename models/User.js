const mongoose = require("mongoose");
// const productSchema = require("./Product");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  localAuth: {
    username: String,
    password: String,
    email: String,
    zipCode: String
  },
  facebookAuth: {
    id: String,
    firstName: String,
    lastName: String
  },
  googleAuth: {
    id: String,
    name: String
  },
  cart: [
    {
      _id: false,
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "products"
      },
      quantity: Number
    }
  ],
  purchases: [
    {
      itemIDs: [],
      date: { type: Date, default: Date.now }
    }
  ],
  addedItems: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "products"
    }
  ]
});

mongoose.model("users", userSchema);
