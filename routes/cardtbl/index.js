//initialize of router
const router = require('express').Router();
const cardtbl = require('../../controllers/cardtbl/cardtbl.controller');

//endpoint
router.get('/checkCard', cardtbl.getCardByUserId);
// router.get("/invalid", cardtbl);
router.post('/', cardtbl.cardtblInsert);
router.get('/lossCard', cardtbl.getCardByUserId);

module.exports = router;
