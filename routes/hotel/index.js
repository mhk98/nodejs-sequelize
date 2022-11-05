const router = require("express").Router();
const hotel = require("../../controllers/hotel/hotel.controller");

router.post("/", hotel.hotelInsert);

module.exports = router;
