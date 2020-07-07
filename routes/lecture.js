const express = require("express");
const router = express.Router();

const { create, list } = require("../controllers/lecture");

router.post("/lecture/create", create);
router.get("/lecture/:sectionId", list);
// router.post("/section/edit", update);

module.exports = router;
