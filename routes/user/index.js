const router = require('express').Router();
const user = require('../../controllers/user/users.controller');
// const recharge = require('../../models/recharge/recharge');

// router.post('/', user.userInsert);
// router.get('/cards/id', User.getCardByUserId);
// router.post('/', user.create);
router.get('/', user.findAll);

module.exports = router;
