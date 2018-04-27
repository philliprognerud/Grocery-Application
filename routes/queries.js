const mongoose = require("mongoose");
const User = mongoose.model("users");
const Product = mongoose.model("products");
const Guest = mongoose.model("guests");
const oktaClient = require("./lib/oktaClient");

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
    let reqTags = req.body.keywords;

    if (typeof req.body.keywords === "string") {
      reqTags = req.body.keywords.split(" ");
    }

    let regexTags = reqTags.map(tag => {
      return new RegExp(tag.charAt(0).toUpperCase() + tag.slice(1));
    });

    Product.find({
      $or: [
        {
          tags: {
            $all: reqTags
          }
        },
        { name: { $all: regexTags } }
      ]
    }).exec(function(err, docs) {
      err ? console.log(err) : res.send(docs);
    });
  });

  app.post("/api/new-items", async function(req, res) {
    Product.find()
      .sort({ date: "descending" })
      .limit(18)
      .exec(function(err, docs) {
        err ? console.log(err) : res.send(docs);
      });
  });

  app.post("/api/merge-carts", async function(req, res) {
    await Guest.findOne({ cookieID: req.sessionID }).exec(
      async (err, docGuest) => {
        if (err) {
          console.log(err);
        }

        await User.findOneAndUpdate(
          { _id: req.user._id },
          { $set: { cart: docGuest.cart } },
          { upsert: true, new: true }
        ).exec();

        await Guest.findOneAndUpdate(
          { cookieID: req.sessionID },
          { $pull: { cart: { $exists: true } } },
          { upsert: true, new: true }
        );

        res.send();
      }
    );
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

  app.post("/api/get-orders", async function(req, res) {
    if (req.user) {
      User.findOne({ _id: req.user._id }).exec(function(err, docs) {
        if (err) {
          console.log(err);
        } else {
          docs ? res.send({ orders: docs.purchases }) : res.send(null);
        }
      });
    } else {
      Guest.findOne({ cookieID: req.sessionID }).exec(function(err, docs) {
        if (err) {
          console.log(err);
        } else {
          docs ? res.send({ orders: docs.purchases }) : res.send(null);
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

  app.post("/api/save-address", async function(req, res) {
    if (req.user) {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            addrs: {
              fullName: req.body.fullName,
              address: req.body.address,
              city: req.body.city,
              state: req.body.state,
              zip: req.body.zip,
              phone: req.body.phone,
              instructions: req.body.instruction
            }
          }
        },
        { upsert: true, new: true }
      ).exec((err, doc) => {
        if (err) {
          console.log(err);
        }

        res.send({ addrs: doc.addrs });
      });
    } else {
      Guest.findOneAndUpdate(
        { cookieID: req.sessionID },
        {
          $push: {
            addrs: {
              fullName: req.body.fullName,
              address: req.body.address,
              city: req.body.city,
              state: req.body.state,
              zip: req.body.zip,
              phone: req.body.phone,
              instructions: req.body.instruction
            }
          }
        },
        { upsert: true, new: true }
      ).exec((err, doc) => {
        if (err) {
          console.log(err);
        }

        res.send({ addrs: doc.addrs });
      });
    }
  });

  app.post("/api/reorder-update-cart", async function(req, res) {
    let cart = req.body.cart.map(item => {
      return { product: item.sku, quantity: item.quantity };
    });

    if (req.user) {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $addToSet: {
            cart: cart
          }
        },
        { upsert: true, new: true }
      ).exec((err, doc) => {
        if (err) {
          console.log(err);
        }

        res.send();
      });
    } else {
      Guest.findOneAndUpdate(
        { cookieID: req.sessionID },
        {
          $addToSet: {
            cart: cart
          }
        },
        { upsert: true, new: true }
      ).exec((err, doc) => {
        if (err) {
          console.log(err);
        }

        res.send();
      });
    }
  });

  //Need to add case for guests
  app.get("/api/get-addrs", async function(req, res) {
    if (req.user) {
      User.findOne({ _id: req.user._id }).exec((err, doc) => {
        if (err) {
          console.log(err);
        }

        res.send({ addrs: doc.addrs });
      });
    } else {
      Guest.findOneAndUpdate({ cookieID: req.sessionID }).exec((err, doc) => {
        if (err) {
          console.log(err);
        }

        res.send({ addrs: doc.addrs });
      });
    }
  });

  app.post("/api/remove-addr", async function(req, res) {
    //Update users added items and remove from array
    if (req.user) {
      User.findOneAndUpdate(
        { _id: req.user._id },
        { $pull: { addrs: { address: req.body.address } } },
        { new: true }
      ).exec(function(err, doc) {
        if (err) {
          console.log(err);
        }

        res.send(doc.addrs);
      });
    } else {
      Guest.findOneAndUpdate(
        { cookieID: req.sessionID },
        { $pull: { addrs: { address: req.body.address } } },
        { new: true }
      ).exec(function(err, doc) {
        if (err) {
          console.log(err);
        }

        res.send(doc.addrs);
      });
    }
  });

  app.post("/api/save-card", async function(req, res) {
    const { name, cardNumber, cvc, expireMonth, expireYear } = req.body;

    if (req.user) {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cards: {
              name,
              cardNumber,
              cvc,
              expireMonth,
              expireYear
            }
          }
        },
        { upsert: true, new: true }
      ).exec((err, doc) => {
        if (err) {
          console.log(err);
        }

        res.send();
      });
    } else {
      Guest.findOneAndUpdate(
        { cookieID: req.sessionID },
        {
          $push: {
            cards: {
              name,
              cardNumber,
              cvc,
              expireMonth,
              expireYear
            }
          }
        },
        { upsert: true, new: true }
      ).exec((err, doc) => {
        if (err) {
          console.log(err);
        }

        res.send();
      });
    }
  });

  app.get("/api/get-cards", async function(req, res) {
    if (req.user) {
      User.findOne({ _id: req.user._id }).exec((err, doc) => {
        if (err) {
          console.log(err);
        }

        res.send({ cards: doc.cards });
      });
    } else {
      Guest.findOneAndUpdate({ cookieID: req.sessionID }).exec((err, doc) => {
        if (err) {
          console.log(err);
        }

        res.send({ cards: doc.cards });
      });
    }
  });

  app.get("/api/get-purchases", async function(req, res) {
    if (req.user) {
      User.findOne({ _id: req.user._id }).exec((err, doc) => {
        if (err) {
          console.log(err);
        }

        res.send({ purchases: doc.purchases });
      });
    } else {
      Guest.findOneAndUpdate({ cookieID: req.sessionID }).exec((err, doc) => {
        if (err) {
          console.log(err);
        }

        res.send({ purchases: doc.purchases });
      });
    }
  });

  app.post("/api/check-session-id", async function(req, res) {
    let sessionRes = await oktaClient.getSession(req.body.sessionId);

    console.log(sessionRes);
  });
};
