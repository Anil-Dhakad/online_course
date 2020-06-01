const express = require("express");
const router = express.Router();

const { create, remove, list } = require("../controllers/cart");

router.post("/cart/add", create);
router.post("/cart/remove", remove);
router.post("/cart/list", list);

module.exports = router;
