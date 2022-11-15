const router = require('express').Router();
const auth = require('./auth');
// const hotel = require('./hotel'); //depricated model
const recharge = require('./recharge');
const lost_history = require('./lost_history');
const cardtbl = require('./cardtbl');
const usagetbl = require('./usagetbl');
const user = require('./user');
const sslCommerz = require('./sslCommerz');
// const sslCommerz = require('./sslCommerz');

router.use('/auth', auth);
// router.use('/ssl-payment-success', sslCommerz);
router.use('/recharge', recharge);
router.use('/lost_historytbls', lost_history);
router.use('/cardtbl', cardtbl);
router.use('/usagetbl', usagetbl);
router.use('/user', user);
router.use('/', sslCommerz);

module.exports = router;
