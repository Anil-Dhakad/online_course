const Category = require("../models/category");
const { errorHandler } = require("../helphers/dbErrorHandler");

exports.create = (req, res) => {
  const category = new Category(req.body);

  Category.find({ name: category.name })
    .collation({ locale: "en", strength: 2 })
    .exec((err, data) => {
      if (data.length === 0) {
        category.save((err, result) => {
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
  Category.find()
    .sort({ name: 1 })
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      return res.json(result);
    });
};

exports.update = (req, res) => {
  const id = req.body;

  Category.findOneAndUpdate(
    { _id: id._id },
    { name: id.name },
    { new: true, useFindAndModify: false },
    (err, result) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      return res.json(result);
    }
  );
};

exports.del = (req, res) => {
  const id = req.body;

  Category.deleteOne({ _id: id }, (err) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    return res.json("yes");
  });
};
