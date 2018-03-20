const mongoose = require("mongoose");
const User = mongoose.model("users");
const Product = mongoose.model("products");

module.exports = app => {
  //Return a list of newest added items to database in descending order
  app.get("/api/newly-added", async function(req, res) {
    Product.find({})
      .sort({ date: "descending" })
      .limit(req.body.limit)
      .exec(function(err, docs) {
        err ? console.log(err) : res.send(docs);
      });
  });

  //Populate the User Schema Array of addedItems
  app.post("/api/current-user-added-items", async function(req, res) {
    User.findOne({ _id: req.body.id })
      .populate("addedItems")
      .exec(function(err, docs) {
        err ? console.log(err) : res.send(docs.addedItems);
      });
  });

  app.post("/api/remove-item", async function(req, res) {
    await User.findOneAndUpdate(
      { _id: req.body.userID },
      { $pull: { addedItems: req.body.productID } },
      { new: true },
      function(err, doc) {
        if (err) {
          res.send({ success: false });
        } else {
          res.send({ success: true });
        }
      }
    );
  });
};
