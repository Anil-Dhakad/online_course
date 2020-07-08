const express = require("express");
const router = express.Router();

const { create, listByUser, listAll } = require("../controllers/order");

router.post("/order/add", create);
router.post("/order/listByUser", listByUser);
router.post("/order/listAll", listAll);

module.exports = router;
