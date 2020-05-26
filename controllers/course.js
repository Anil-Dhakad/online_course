const Course = require("../models/course");
var multer = require("multer");

const { errorHandler } = require("../helphers/dbErrorHandler");

exports.create = (req, res) => {
  var upload = multer({ dest: "front/public/images/course_profile" }).single(
    "photo"
  );

  upload(req, res, (err) => {
    console.log("data: ", req.body);
    console.log("file: ", req.file);

    const { name, description, price, category, skills, user } = req.body;

    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.json({ error: "Please select an image to upload" });
    } else if (err instanceof multer.MulterError) {
      return res.json({ error: err });
    } else if (err) {
      return res.json({ error: err });
    } else if (
      !name ||
      !description ||
      !price ||
      !category ||
      !skills ||
      !user
    ) {
      return res.json({ error: "all fields" });
    }

    let course = new Course(req.body);
    course.photo = req.file.filename;

    Course.find({ name: name })
      .collation({ locale: "en", strength: 2 })
      .exec((err, data) => {
        if (data.length === 0) {
          course.save((err, result) => {
            if (err) {
              return res.json({ error: errorHandler(err) });
            }
            return res.json({ msg: "created" });
          });
        } else {
          return res.json({ msg: "not" });
        }
      });
  });
};

exports.update = (req, res) => {
  var upload = multer({ dest: "front/public/images/course_profile" }).single(
    "photo"
  );

  upload(req, res, (err) => {
    console.log("data: ", req.body);
    console.log("file: ", req.file);

    const { id, name, description, price, category, skills } = req.body;

    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.json({ error: "Please select an image to upload" });
    } else if (err instanceof multer.MulterError) {
      return res.json({ error: err });
    } else if (err) {
      return res.json({ error: err });
    } else if (!name || !description || !price || !category || !skills) {
      return res.json({ error: "all fields" });
    }

    Course.findOneAndUpdate(
      { _id: id },
      {
        name: name,
        description: description,
        price: price,
        category: category,
        photo: req.file.filename,
      },
      { new: true, useFindAndModify: false },
      (err, result) => {
        console.log("result: ", result);
        if (err) {
          return res.json({ error: errorHandler(err) });
        } else if (result) {
          return res.json({ msg: "updated" });
        } else {
          return res.json({ error: "Course not found" });
        }
      }
    );
  });
};

exports.del = (req, res) => {
  const id = req.body;
  Course.deleteOne({ _id: id }, (err, result) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    return res.json("yes");
    return;
  });
};

exports.list = (req, res) => {
  Course.find()
    .populate("category")
    .populate("user")
    .populate("Skills")
    // .sort({ name: 1 })
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      return res.json(result);
    });
};
