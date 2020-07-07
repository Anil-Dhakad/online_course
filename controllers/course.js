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

    let skill = req.body.skills;

    let list = skill.split(",");

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

    let course = new Course();
    course._id = req.body._id;
    course.name = req.body.name;
    course.description = req.body.description;
    course.price = req.body.price;
    course.category = req.body.category;
    course.user = req.body.user;
    course.skills = list;
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
  // console.log("data: ", req.body);
  const { id, name, description, price, category, skills } = req.body;

  if (!name || !description || !price || !category || !skills) {
    return res.json({ error: "all fields" });
  } else {
    Course.findOneAndUpdate(
      { _id: id },
      {
        name: name,
        description: description,
        price: price,
        category: category,
        skills: skills,
      },
      { new: true, useFindAndModify: false },
      (err, result) => {
        // console.log("result: ", result);
        if (err) {
          return res.json({ error: errorHandler(err) });
        } else if (result) {
          return res.json({ msg: "updated" });
        } else {
          return res.json({ error: "Course not found" });
        }
      }
    );
  }
};

exports.updatePhoto = (req, res) => {
  var upload = multer({ dest: "front/public/images/course_profile" }).single(
    "photo"
  );

  upload(req, res, (err) => {
    // console.log("data: ", req.body);
    // console.log("file: ", req.file);

    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.json({ error: "Please select an image to upload" });
    } else if (err instanceof multer.MulterError) {
      return res.json({ error: err });
    } else if (err) {
      return res.json({ error: err });
    }

    Course.findOneAndUpdate(
      { _id: req.body.id },
      { photo: req.file.filename },
      { new: true, useFindAndModify: false },
      (err, result) => {
        // console.log("result: ", result);
        if (err) {
          return res.json({ error: errorHandler(err) });
        } else if (result) {
          return res.json({ result: result });
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
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      // console.log("result: ", result);
      // result.hashed_password = undefined;
      return res.json(result);
    });
};

exports.search = (req, res) => {
  console.log("body: ", req.body);
  const d = req.body;

  let sortBy = "";
  let order = "";
  if (d.sort === "new") {
    sortBy = "createAt";
    order = "desc";
  } else if (d.sort === "low") {
    sortBy = "price";
    order = "asc";
  } else if (d.sort === "high") {
    sortBy = "price";
    order = "desc";
  } else {
    sortBy = "name";
    order = "asc";
  }

  let great = 0;
  let less = 10000;

  if (d.price !== "") {
    great = d.price[0];
    less = d.price[1];
  }

  let filter = {};
  if (d.category !== "") {
    filter["category"] = d.category;
    filter["price"] = { $gte: great, $lte: less };
  } else {
    filter["price"] = { $gte: great, $lte: less };
  }

  // console.log("filter: ", filter);

  Course.find(filter)
    .populate("category")
    .populate("user")
    .sort([[sortBy, order]])
    .exec((err, result) => {
      // console.log("result: ", result);
      result.forEach((element) => {
        console.log("result: ", element.name);
      });
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      } else if (d.skill != "") {
        let Dict = {};
        result.forEach((element) => {
          console.log("element: ", element.name);
          element.skills.forEach((key) => {
            if (Dict[key]) {
              Dict[key].push(element);
            } else {
              Dict[key] = [element];
            }
          });
        });
        skill_list = d.skill;

        let array = [];
        skill_list.forEach((skill) => {
          if (skill in Dict) {
            Dict[skill].forEach((s) => {
              console.log("s: ", s.name);
              if (!array.includes(s)) {
                array.push(s);
              }
            });
          }
        });
        return res.json(array);
      } else {
        return res.json(result);
      }
    });
};

exports.courseById = (req, res) => {
  id = req.params.courseId;
  Course.findById(id)
    .populate("category")
    .populate("user", "_id name")
    .exec((err, data) => {
      if (err || !data) {
        return res.json({ error: "Course does not exist" });
      }
      return res.json(data);
    });
};
