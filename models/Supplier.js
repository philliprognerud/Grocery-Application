const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const supplierSchema = new Schema({
  singleSignOnAuth: {}, //unknown for now
  itemsAdded: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "products"
    }
  ]
});

mongoose.model("suppliers", supplierSchema);
