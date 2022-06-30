const Favourite = require("../models/favourite");
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");
const product = require("../models/product");

exports.favouriteById = (req, res, next, id) => {
  Favourite.findById(id).exec((err, favourite) => {
    if (err || !favourite) {
      return res.status(404).json({
        error: "favourite does not exist",
      });
    }
    req.favourite = favourite;
    next();
  });
};

exports.addFavouriteProduct = (req, res) => {
  Favourite.findOne({ user: req.profile._id }).exec((err, data) => {
    if (!err || data !== null) {
      console.log(data);
      console.log(req.product);
      data
        .updateOne({ $push: { products: req.product._id } }, { new: true })
        .exec((err, data) => {
          if (!err) {
            res.status(200).json({ message: "Đã Thêm Thành Công" });
          } else {
            return res.status(400).json({ error: errorHandler(err) });
          }
        });
    } else {
      return res.status(400).json({ error: errorHandler(err) });
    }
  });
};
exports.subFavouriteProduct = (req, res) => {
  Favourite.findOne({ user: req.profile._id }).exec((err, data) => {
    if (!err || data !== null) {
      data
        .updateOne(
          // { product: req.product_id },
          { $pull: { products: req.product._id } }
        )
        .exec((err, data) => {
          if (!err) {
            return res.status(200).json({ message: "Đã Xóa Thành Công" });
          } else {
            return res.status(400).json({ error: errorHandler(err) });
          }
        });
    } else {
      return res.status(400).json({ error: errorHandler(err) });
    }
  });
};
exports.listAllFavourite = (req, res) => {
  Favourite.findOne({ user: req.profile._id })
    .populate("user", "name")
    .populate("products","-photo")
    .exec((err, data) => {
      if (!err) {
        res.status(200).json(data);
      } else {
        res.status(400).json({ error: errorHandler(err) });
      }
    });
};
