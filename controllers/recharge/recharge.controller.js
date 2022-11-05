const { createResponse } = require('../../utils/responseGenerator');
const db = require('../../models');
const { async } = require('rxjs');
const Recharge = db.recharge;

// Create and Save a new Recharge
module.exports.rechargeInsert = async (req, res) => {
  try {
    const {
      Recharge_ID,
      Card_ID,
      Transac_Using,
      Transac_Time,
      Transac_Amount,
      Transac_Status,
    } = req.body;
    if (
      !Recharge_ID ||
      typeof Recharge_ID === 'number' ||
      !Card_ID ||
      !Transac_Using ||
      !Transac_Time ||
      !Transac_Amount ||
      !Transac_Status
    ) {
      res.json(createResponse(true, null, 'Parameter missing'));
    } else {
      const result = await Recharge.create({
        Recharge_ID: 34584,
        Card_ID,
        Transac_Using,
        Transac_Time,
        Transac_Amount,
        Transac_Status,
      });

      if (result) {
        res.json(createResponse(true, result, 'Record inserted'));
        console.log(result);
      }
    }
  } catch (error) {
    res.json(createResponse(true, null, `${error.message}`));
  }
};

// Retrieve all Recharges from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Recharge.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving recharge.',
      });
    });
};
