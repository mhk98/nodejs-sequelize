const router = require('express').Router();
const usagetbl = require('../../controllers/usagetbl/usagetbl.controller');

router.post('/', usagetbl.usagetblInsert);
router.get('/', usagetbl.findAll);

module.exports = router;
