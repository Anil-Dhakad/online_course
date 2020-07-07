const Order = require("../models/order");
const { errorHandler } = require("../helphers/dbErrorHandler");

exports.create = (req, res) => {
  const order = new Order(req.body);
  console.log("order: ", order);

  Order.find({ user: order.user, course: order.course })
    .collation({ locale: "en", strength: 2 })
    .exec((err, data) => {
      if (data.length === 0) {
        order.save((err, result) => {
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
  Order.find({ user: user })
    .populate("course")
    .sort({ timestamps: 1 })
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({ error: "No course found" });
      }
      return res.json(result);
    });
};
