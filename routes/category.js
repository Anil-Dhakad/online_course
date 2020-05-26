const express = require("express");
const router = express.Router();

const { create, list, update, del } = require("../controllers/category");

router.post("/category/create", create);
router.post("/category/categories", list);
router.post("/category/edit", update);
router.post("/category/delete", del);

module.exports = router;
