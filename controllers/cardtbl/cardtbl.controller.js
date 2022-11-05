const { createResponse } = require('../../utils/responseGenerator');
const db = require('../../models');
const Card = db.cardtbl;

module.exports.cardtblInsert = async (req, res) => {
  try {
    const {
      Card_No,
      Device_Type,
      Physical_ID,
      User_ID,
      Issue_Date,
      Expire_Date,
      amount,
      last_chargeamounte,
      last_chargeTime,
      status,
    } = req.body;
    if (
      !Card_No ||
      !Device_Type ||
      !Physical_ID ||
      !User_ID ||
      !Issue_Date ||
      !Expire_Date ||
      !amount ||
      !last_chargeamounte ||
      !last_chargeTime ||
      !status
    ) {
      res.json(createResponse(true, null, 'Parameter missing'));
    } else {
      const result = await Card.create({
        Card_No,
        Device_Type,
        Physical_ID,
        User_ID,
        Issue_Date,
        Expire_Date,
        amount,
        last_chargeamounte,
        last_chargeTime,
        status,
      });
      if (result) {
        res.json(createResponse(false, result, 'Record inserted'));
      }
    }
  } catch (error) {
    res.json(createResponse(true, null, `${error.message}`));
  }
};
