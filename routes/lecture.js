const express = require("express");
const router = express.Router();

const { create } = require("../controllers/lecture");

router.post("/lecture/create", create);
// router.get("/section/:courseId", list);
// router.post("/section/edit", update);

module.exports = router;
