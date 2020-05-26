const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
  signout,
  forgotpwd,
  profile,
  changePwd,
  list,
} = require("../controllers/user");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.post("/forgotpwd", forgotpwd);
router.post("/profile", profile);
router.post("/changepwd", changePwd);
router.post("/user/users", list);

module.exports = router;
