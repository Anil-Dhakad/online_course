const express = require("express");
const router = express.Router();

const { create, list, update } = require("../controllers/section");

router.post("/section/create", create);
router.get("/section/:courseId", list);
router.post("/section/edit", update);

module.exports = router;
