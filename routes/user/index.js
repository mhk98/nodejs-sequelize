const router = require('express').Router();
const user = require('../../models/user/user');
// const recharge = require('../../models/recharge/recharge');

router.post('/', user.userInsert);

module.exports = router;
