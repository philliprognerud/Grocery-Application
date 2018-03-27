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
      itemIDs: [],
      date: { type: Date, default: Date.now }
    }
  ]
});

guestSchema.pre("save", function(next) {
  this.sessionActivity = new Date();
  next();
});

mongoose.model("guests", guestSchema);
