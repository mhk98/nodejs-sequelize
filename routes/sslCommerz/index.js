const router = require('express').Router();
const sslCommerz = require('../../controllers/sslCommerz/sslCommerz.controller');

router.post('/ssl-request', sslCommerz.sslrequestInsert);
router.post('/ssl-payment-success', sslCommerz.sslpaymentsuccessInsert);

module.exports = router;
