const express = require("express");
const router = express.Router();

const { create, list, update, del } = require("../controllers/skills");

router.post("/skill/create", create);
router.post("/skill/skills", list);
router.post("/skill/edit", update);
router.post("/skill/delete", del);

module.exports = router;
