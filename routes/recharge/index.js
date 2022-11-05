const router = require('express').Router();
const recharge = require('../../controllers/recharge/recharge.controller');
// const recharge = require('../../models/recharge/recharge');

// Create new recharge info
router.post('/', recharge.rechargeInsert);

// Retrieve all recharge
router.get('/', recharge.findAll);

module.exports = router;
