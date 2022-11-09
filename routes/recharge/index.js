const router = require('express').Router();
const recharge = require('../../controllers/recharge/recharge.controller');
// const lost_history = require('../../models/lost_history/lost_history');
// const recharge = require('../../models/recharge/recharge');

router.post('/', recharge.rechargeInsert);
router.get('/reChargeCard', recharge.getRechargeById);
router.get('/cardReachAndConsump', recharge.getRechargeById);

module.exports = router;
