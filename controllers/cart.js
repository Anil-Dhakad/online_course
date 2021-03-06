const Cart = require("../models/cart");
const { errorHandler } = require("../helphers/dbErrorHandler");

exports.create = (req, res) => {
  const cart = new Cart(req.body);
  console.log("cart: ", cart);

  Cart.find({ user: cart.user, course: cart.course })
    .collation({ locale: "en", strength: 2 })
    .exec((err, data) => {
      if (data.length === 0) {
        cart.save((err, result) => {
          if (err) {
            return res.status(400).json({ error: errorHandler(err) });
          }
          return res.json(result);
        });
      } else {
        return res.json({ error: "not" });
      }
    });
};

exports.list = (req, res) => {
  const user = req.body.id;
  Cart.find({ user: user })
    .populate("course")
    .populate("user", "_id name")
    .sort({ timestamps: 1 })
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({ error: "No course found" });
      }
      return res.json(result);
    });
};

exports.remove = (req, res) => {
  const id = req.body;
  Cart.deleteOne({ _id: id }, (err, result) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    return res.json("yes");
  });
};
