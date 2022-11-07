const router = require('express').Router();
const cardtbl = require('../../controllers/cardtbl/cardtbl.controller');

//endpoint
router.get('/checkCard', cardtbl.getCardByUserId);
router.post('/', cardtbl.cardtblInsert);

module.exports = router;
