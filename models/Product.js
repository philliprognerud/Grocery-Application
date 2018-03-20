const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  image: String,
  price: String,
  name: String,
  weight: String,
  stock: String,
  date: { type: Date, default: Date.now },
  tags: [],
  addedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "users"
  }
});

mongoose.model("products", productSchema);
