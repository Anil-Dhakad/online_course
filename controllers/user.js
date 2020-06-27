const User = require("../models/user");
const jwt = require("jsonwebtoken"); // to generate  signed token
const expressJwt = require("express-jwt"); // for authorization check
const { errorHandler } = require("../helphers/dbErrorHandler");
var multer = require("multer");

exports.signup = (req, res) => {
  const user = new User(req.body);

  console.log("User: ", user);

  user.save((err, result) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    result.salt = undefined;
    result.hashed_password = undefined;
    res.json({ result });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, result) => {
    if (err || !result) {
      return res.status(400).json({
        error: "Email-Id does not exist. Please signup",
      });
    }
    if (!result.authenticate(password)) {
      return res.status(401).json({
        error: "Email and Password not match",
      });
    }

    const token = jwt.sign({ _id: result._id }, process.env.JWT_SECRET);
    res.cookie("t", token, { expire: new Date() + 9999 });

    const { _id, name, email, role, photo } = result;
    return res.json({ token, user: { _id, email, name, role, photo } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout successfully" });
};

exports.forgotpwd = (req, res) => {
  const { email } = req.body;

  User.findOne({ email }, (err, result) => {
    if (err || !result) {
      return res.status(400).json({
        error: "Email-Id does not exist. Please signup",
      });
    }
    return res.json("Password reset link sent on your email-id");
  });
};

exports.profile = (req, res) => {
  const user = req.body;

  User.findOneAndUpdate(
    { _id: user._id },
    { name: user.name, email: user.email },
    { new: true, useFindAndModify: false },
    (err, result) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      return res.json(result);
    }
  );
};

exports.isClient = (req, res) => {
  const { email } = req.body;

  User.findOne({ email }, (err, result) => {
    if (err || !result) {
      return res.status(400).json({
        error: "Access denied! not a valid user",
      });
    }
  });
};

exports.isAdmin = (req, res) => {
  const { email } = req.body;

  User.findOne({ email }, (err, result) => {
    if (err || !result) {
      return res.status(400).json({
        error: "Access denied! Admin resource",
      });
    }
  });
};

exports.isInstructor = (req, res) => {
  const { email } = req.body;

  User.findOne({ email }, (err, result) => {
    if (err || !result) {
      return res.status(400).json({
        error: "Access denied! not an instructor",
      });
    }
  });
};

exports.changePwd = (req, res) => {
  const u = req.body;

  User.findOne({ _id: u._id }, (err, result) => {
    if (err || !result) {
      return res.status(400).json({
        error: "Not a valid user...",
      });
    } else if (!result.authenticate(u.oldPwd)) {
      return res.json("incorrect");
    } else {
      const pwd = result.encryptPassword(u.password);
      User.findOneAndUpdate(
        { _id: u._id },
        { hashed_password: pwd },
        { new: true, useFindAndModify: false },
        (err, data) => {
          if (err) {
            return res.status(400).json({ error: errorHandler(err) });
          }
          return res.json("yes");
        }
      );
    }
  });
};

exports.list = (req, res) => {
  User.find({ role: { $ne: "admin" } })
    .select("-hashed_password")
    .select("-salt")
    .select("-updatedAt")
    .select("-__v")
    .sort({ name: 1 })
    .exec((err, result) => {
      console.log("result: ", result);
      if (err) {
        return res.status(400).json({ error: "No user found" });
      }
      return res.json(result);
    });
};

exports.updatePhoto = (req, res) => {
  var upload = multer({ dest: "front/public/images/user" }).single("photo");

  upload(req, res, (err) => {
    console.log("data: ", req.body);
    console.log("file: ", req.file);

    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.json({ error: "Please select an image to upload" });
    } else if (err instanceof multer.MulterError) {
      return res.json({ error: err });
    } else if (err) {
      return res.json({ error: err });
    }

    User.findOneAndUpdate(
      { _id: req.body.id },
      { photo: req.file.filename },
      { new: true, useFindAndModify: false },
      (err, result) => {
        console.log("result: ", result);
        if (err) {
          return res.json({ error: errorHandler(err) });
        } else if (result) {
          return res.json({ result: result.photo });
        } else {
          return res.json({ error: "Invalid user" });
        }
      }
    );
  });
};
