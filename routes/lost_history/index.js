const router = require('express').Router();
const lost_history = require('../../controllers/lost-history.controller/lost-history.controller');

router.post('/', lost_history.lost_historyInsert);
module.exports = router;
