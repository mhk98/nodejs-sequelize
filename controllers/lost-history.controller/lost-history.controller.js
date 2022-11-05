const { createResponse } = require('../../utils/responseGenerator');
const db = require('../../models');
const Lost_history = db.lost_history;

module.exports.lost_historyInsert = async (req, res) => {
  try {
    const {
      Card_No,
      User_ID,
      Lost_Date,
      Last_Balance,
      Balance_Transferred,
      Card_Issue,
      Referred_to,
    } = req.body;

    if (
      !Card_No ||
      !User_ID ||
      !Lost_Date ||
      !Last_Balance ||
      !Balance_Transferred ||
      !Card_Issue ||
      !Referred_to
    ) {
      res.json(createResponse(true, null, 'Parameter missing'));
    } else {
      const result = await Lost_history.create({
        Card_No,
        User_ID,
        Lost_Date,
        Last_Balance,
        Balance_Transferred,
        Card_Issue,
        Referred_to,
      });

      if (result) {
        res.json(createResponse(true, result, 'Record inserted'));
        console.log(true);
      }
    }
  } catch (error) {
    res.json(createResponse(true, null, `${error.message}`));
    // console.log(error);
  }
};
