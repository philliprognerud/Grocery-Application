const mongoose = require("mongoose");
const User = mongoose.model("users");
const Product = mongoose.model("products");
const Guest = mongoose.model("guests");

module.exports = app => {
  //Adds item to User cart registered or guest
  app.post("/api/add-to-cart", async function(req, res) {
    //If user logged in then update their User.cart
    if (req.user) {
      User.findOne({ _id: req.user._id }).exec(function(err, doc) {
        if (err) {
          console.log(err);
        } else {
          const item = doc.cart.findIndex(
            item => item.product == req.body.itemID
          );

          if (item !== -1) {
            doc.cart[item].quantity += 1;
          } else {
            doc.cart.push({ product: req.body.itemID, quantity: 1 });
          }

          doc.save();
          res.send({ cartSize: doc.cart.length });
        }
      });
    } else {
      //Else create Guest user and track with cookie id and add to cart
      Guest.findOneAndUpdate(
        { cookieID: req.sessionID },
        { cookieID: req.sessionID, createdAt: new Date() },
        { upsert: true, new: true }
      ).exec(function(err, doc) {
        if (err) {
          console.log(err);
        } else {
          const item = doc.cart.findIndex(
            item => item.product == req.body.itemID
          );

          if (item !== -1) {
            doc.cart[item].quantity += 1;
          } else {
            doc.cart.push({ product: req.body.itemID, quantity: 1 });
          }

          doc.save();
          res.send({ cartSize: doc.cart.length });
        }
      });
    }
  });

  //Return a list of newest added items to database in descending order
  app.post("/api/carousel-items", async function(req, res) {
    const reqTags = req.body.keywords;

    Product.find({
      tags: {
        $all: reqTags
      }
    })
      .sort({ date: "descending" })
      .limit(20)
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
    //Update users added items and remove from array
    User.findOneAndUpdate(
      { _id: req.body.userID },
      { $pull: { addedItems: req.body.productID } },
      { new: true },
      function(err, doc) {
        if (err) {
          res.send({ success: false });
        }
      }
    );

    //remove product entirely
    Product.findByIdAndRemove(req.body.productID, function(err, doc) {
      if (err) {
        res.send({ success: false });
      }
    });

    res.send({ success: true });
  });

  app.post("/api/items-in-cart", async function(req, res) {
    if (req.user) {
      User.findOne({ _id: req.user._id })
        .populate("cart.product")
        .exec(function(err, docs) {
          if (err) {
            console.log(err);
          } else {
            docs ? res.send({ cart: docs.cart }) : res.send(null);
          }
        });
    } else {
      Guest.findOne({ cookieID: req.sessionID })
        .populate("cart.product")
        .exec(function(err, docs) {
          if (err) {
            console.log(err);
          } else {
            docs ? res.send({ cart: docs.cart }) : res.send(null);
          }
        });
    }
  });

  app.post("/api/update-item-quantity", async function(req, res) {
    if (req.user) {
      User.findOne({ _id: req.user._id }).exec(function(err, doc) {
        if (err) {
          console.log(err);
        }

        let item = doc.cart.find(entry => entry.product == req.body.itemID);

        if (req.body.quantity === "0") {
          doc.cart.splice(doc.cart.indexOf(item), 1);
        } else {
          doc.cart[doc.cart.indexOf(item)].quantity = req.body.quantity;
        }

        doc.save();

        res.send();
      });
    } else {
      Guest.findOne({ cookieID: req.sessionID }).exec(function(err, doc) {
        if (err) {
          console.log(err);
        }

        let item = doc.cart.find(entry => entry.product == req.body.itemID);

        if (req.body.quantity === "0") {
          doc.cart.splice(doc.cart.indexOf(item), 1);
        } else {
          doc.cart[doc.cart.indexOf(item)].quantity = req.body.quantity;
        }

        doc.save();

        res.send();
      });
    }
  });
};
