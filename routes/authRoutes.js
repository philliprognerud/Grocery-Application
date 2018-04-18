const passport = require("passport");
const middleware = require("../middleware");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const User = mongoose.model("users");
const Guest = mongoose.model("guests");
const Product = mongoose.model("products");
const paypal = require("paypal-rest-sdk");

module.exports = app => {
  app.post("/auth/login", async function(req, res, next) {
    passport.authenticate("local", async function(err, user, info) {
      if (err) {
        return next(err);
      }

      if (!user) {
        res.send({ success: false, message: "authentication failed" });
      } else {
        req.login(user, err => {
          if (err) {
            next(err);
          }
        });
        res.send({ success: true, message: "authentication succeeded" });
      }
    })(req, res, next);
  });

  app.get("/auth/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/auth/loggedin", middleware.isLoggedIn, function(req, res) {
    res.send(req.user);
  });

  app.post(
    "/auth/signup",
    middleware.usernameAvail,
    middleware.emailAvail,
    async function(req, res, next) {
      if (req.usernameTaken || req.emailTaken) {
        res.send({
          usernameTaken: req.usernameTaken,
          emailTaken: req.emailTaken,
          accountCreated: false
        });

        return next();
      }

      const newUser = await middleware.createAccount(
        req.body.username,
        req.body.password,
        req.body.email,
        req.body.zipCode
      );

      res.send({ accountCreated: true });

      req.login(newUser, err => {
        if (err) {
          return next(err);
        }
      });
    }
  );

  app.get("/auth/facebook", passport.authenticate("facebook"));

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/" }),
    function(req, res) {
      res.redirect("/");
    }
  );

  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    function(req, res) {
      res.redirect("/");
    }
  );

  app.post("/auth/checkout-cc", function(req, res) {
    let totalAmount = 0;
    let paypalItems = req.body.cart.map(item => {
      totalAmount +=
        (item.product.price * req.body.discount).toFixed(2) * item.quantity;

      return {
        name: item.product.name,
        sku: item.product._id,
        price: (item.product.price * req.body.discount).toFixed(2),
        currency: "USD",
        quantity: item.quantity
      };
    });

    totalAmount = totalAmount.toString();

    if (req.user) {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            purchases: {
              totalAmount: totalAmount.toString(),
              item_list: { items: paypalItems }
            }
          },
          $set: { cart: [] }
        },
        { upsert: true, new: true }
      ).exec(function(err, doc) {
        err ? console.log(err) : res.send("/checkout/success");
      });
    } else {
      Guest.findOneAndUpdate(
        { cookieID: req.sessionID },
        {
          $push: {
            purchases: {
              totalAmount: totalAmount.toString(),
              item_list: req.body.cart
            }
          },
          $set: { cart: [] }
        },
        { upsert: true, new: true }
      ).exec(function(err, doc) {
        err ? console.log(err) : res.send("/checkout/success");
      });
    }
  });

  app.post("/auth/checkout", function(req, res) {
    //Calculate total amount of cart;
    //Re-map cart items to fit PayPals parameters
    let totalAmount = 0;
    let paypalItems = req.body.cart.map(item => {
      totalAmount +=
        (item.product.price * req.body.discount).toFixed(2) * item.quantity;
      return {
        name: item.product.name,
        sku: item.product._id,
        price: (item.product.price * req.body.discount).toFixed(2),
        currency: "USD",
        quantity: item.quantity
      };
    });

    totalAmount = totalAmount.toString();
    app.set("totalAmount", totalAmount);

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal"
      },
      redirect_urls: {
        return_url:
          "https://a07cae693dbc4ff0b97e09bfc02303fc.vfs.cloud9.us-west-2.amazonaws.com/auth/success",
        cancel_url:
          "https://a07cae693dbc4ff0b97e09bfc02303fc.vfs.cloud9.us-west-2.amazonaws.com/cancel"
      },
      transactions: [
        {
          item_list: {
            items: paypalItems
          },
          amount: {
            currency: "USD",
            total: totalAmount
          },
          description: "This is the payment description."
        }
      ]
    };

    //Create paypal object and get approval URL
    paypal.payment.create(create_payment_json, function(error, payment) {
      if (error) {
        throw error;
      } else {
        let link = payment.links.find(link => {
          return link.rel === "approval_url";
        });

        res.send(link.href);
      }
    });
  });

  app.get("/auth/success", function(req, res) {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const totalAmount = app.get("totalAmount");

    const execute_payment_json = {
      payer_id: payerId,
      transactions: [
        {
          amount: {
            currency: "USD",
            total: totalAmount
          }
        }
      ]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function(
      error,
      payment
    ) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        if (req.user) {
          User.findOneAndUpdate(
            { _id: req.user._id },
            {
              $push: {
                purchases: {
                  totalAmount: totalAmount.toString(),
                  item_list: payment.transactions[0].item_list
                }
              },
              $set: { cart: [] }
            },
            { upsert: true, new: true }
          ).exec(function(err, doc) {
            err ? console.log(err) : res.redirect("/checkout/success");
          });
        } else {
          Guest.findOneAndUpdate(
            { cookieID: req.sessionID },
            {
              $push: {
                purchases: {
                  totalAmount: totalAmount.toString(),
                  item_list: payment.transactions[0].item_list
                }
              },
              $set: { cart: [] }
            },
            { upsert: true, new: true }
          ).exec(function(err, doc) {
            err ? console.log(err) : res.redirect("/checkout/success");
          });
        }
      }
    });
  });
};
