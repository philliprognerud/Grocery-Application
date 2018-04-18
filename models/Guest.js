const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const guestSchema = new Schema({
  _id: false,
  createdAt: { type: Date, expires: 10 * 24 * 3600 },
  cookieID: String,
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
      totalAmount: String,
      item_list: [],
      date: { type: Date, default: Date.now }
    }
  ],
  addrs: [
    {
      _id: false,
      fullName: String,
      address: String,
      city: String,
      state: String,
      zip: String,
      phone: String,
      instructions: String
    }
  ],
  cards: [
    {
      name: String,
      cardNumber: String,
      cvc: String,
      expireMonth: String,
      expireYear: String
    }
  ]
});

guestSchema.pre("save", function(next) {
  this.sessionActivity = new Date();
  next();
});

mongoose.model("guests", guestSchema);
