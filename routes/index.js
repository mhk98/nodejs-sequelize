const router = require('express').Router();
const auth = require('./auth');
// const hotel = require('./hotel');
const recharge = require('./recharge');
const lost_history = require('./lost_history');
const cardtbl = require('./cardtbl');
const usagetbl = require('./usagetbl');
const user = require('./user');
// const user = require('./user');

// router.use('/auth', auth);
// router.use('/hotel', hotel);
router.use('/recharge', recharge);
router.use('/lost_history', lost_history);
router.use('/cardtbl', cardtbl);
router.use('/usagetbl', usagetbl);
router.use('/user', user);

module.exports = router;
