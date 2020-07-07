const express = require("express");
const router = express.Router();

const { create, list } = require("../controllers/order");

router.post("/order/add", create);
router.post("/order/list", list);

module.exports = router;
