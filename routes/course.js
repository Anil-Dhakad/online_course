const express = require("express");
const router = express.Router();

const { create, del, update, list } = require("../controllers/course");

router.post("/course/create", create);
router.post("/course/delete", del);
router.post("/course/edit", update);
router.post("/course/courses", list);

module.exports = router;
