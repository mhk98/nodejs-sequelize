const router = require('express').Router();
const cardtbl = require('../../controllers/cardtbl/cardtbl.controller');

router.post('/', cardtbl.cardtblInsert);

module.exports = router;
