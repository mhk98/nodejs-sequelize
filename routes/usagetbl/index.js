const router = require("express").Router();
const usagetbl = require("../../controllers/usagetbl/usagetbl.controller");

router.post("/", usagetbl.usagetblInsert);

module.exports = router;
