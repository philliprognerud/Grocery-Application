const middleware = require("../middleware");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const User = mongoose.model("users");
const Product = mongoose.model("products");
const fs = require("fs");

var AWS = require("aws-sdk");

//aws credentials
AWS.config = new AWS.Config();
AWS.config.accessKeyId = keys.accessKeyAWS;
AWS.config.secretAccessKey = keys.secretKeyAWS;
AWS.config.region = keys.regionAWS;

var s3 = new AWS.S3();

let bucketName = "supplier-image-bucket";

module.exports = app => {
  app.post("/api/supplier-add-item", async function(req, res) {
    let buf = new Buffer(
      req.body.image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    var params = {
      Bucket: bucketName,
      Key: req.body.imageName,
      Body: buf,
      ContentEncoding: "base64",
      ContentType: "image/jpg",
      ACL: "public-read"
    };

    //Upload image to s3 bucket
    s3.upload(params, function(err, data) {
      if (err) {
        console.log(err);
      }
    });

    //Construct S3 public URL for image
    const imageURL =
      "https://s3-us-west-2.amazonaws.com/" +
      bucketName +
      "/" +
      req.body.imageName;

    //Add product to the Database
    const newProduct = await middleware.createProduct(
      imageURL,
      req.body.itemPrice,
      req.body.itemName,
      req.body.itemWeight,
      req.body.stock,
      req.body.tags,
      req.body.id
    );

    //Add product ID into Users addedItems
    await User.findOneAndUpdate(
      { _id: req.body.id },
      { $push: { addedItems: newProduct._id } },
      { upsert: true, new: true }
    );

    if (newProduct) {
      res.send({ productCreated: true });
    }
  });
};
