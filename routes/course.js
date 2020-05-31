const express = require("express");
const router = express.Router();

const {
  create,
  del,
  update,
  updatePhoto,
  list,
  search,
} = require("../controllers/course");

router.post("/course/create", create);
router.post("/course/delete", del);
router.post("/course/edit", update);
router.post("/course/photo", updatePhoto);
router.post("/course/courses", list);
router.post("/course/search", search);

module.exports = router;
