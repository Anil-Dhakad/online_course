const express = require("express");
const router = express.Router();

const { create } = require("../controllers/section");

router.post("/section/create", create);

module.exports = router;
