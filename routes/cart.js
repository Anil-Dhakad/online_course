const express = require("express");
const router = express.Router();

const { create, del, list } = require("../controllers/cart");

router.post("/cart/add", create);
router.post("/cart/delete", del);
router.post("/cart/list", list);

module.exports = router;
