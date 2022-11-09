const { createResponse } = require('../../utils/responseGenerator');
const db = require('../../models');
const Usage = db.usagetbl;

module.exports.usagetblInsert = async (req, res) => {
  console.log(req.body);
  try {
    const {
      Usage_ID,
      Card_No,
      chargeTime_start,
      chargeTime_end,
      charge_Amount,
      chargepreAmount,
      chargepostAmount,
      Last_Vehicle,
      Toll_Gate_No,
      Tunnel_Entry_Point,
      chargeStatus,
    } = req.body;

    console.log(req.body.Toll_Gate_No, ' bla bla ', Toll_Gate_No);

    if (
      !Usage_ID ||
      !Card_No ||
      !chargeTime_start ||
      !chargeTime_end ||
      !charge_Amount ||
      !chargepreAmount ||
      !chargepostAmount ||
      !Last_Vehicle ||
      !Toll_Gate_No ||
      !Tunnel_Entry_Point ||
      !chargeStatus
    ) {
      res.json(createResponse(true, null, 'Parameter missing'));
    } else {
      const result = await Usage.create({
        Usage_ID,
        Card_No,
        chargeTime_start,
        chargeTime_end,
        charge_Amount,
        chargepreAmount,
        chargepostAmount,
        Last_Vehicle,
        Toll_Gate_No,
        Tunnel_Entry_Point,
        chargeStatus,
      });
      if (result) {
        res.json(createResponse(false, result, 'Record inserted'));
      }
    }
  } catch (error) {
    res.json(createResponse(true, null, `${error.message}`));
  }
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Usage.findAll({ where: condition })
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

// get all cards of a user using card no
module.exports.getUsageById = async (req, res, next) => {
  try {
    //card no
    const { id } = req.body;
    //gaurd condition
    if (!id) {
      res.json(createResponse(null, 'rechage card not found', true));
    }
    // body has id
    else {
      const result = await Card.findOne({
        where: {
          //checking whether id is matching
          id: id,
        },
        include: [
          {
            model: Usage,
            // to check particular data by attributes
            // attributes: ['Device_Type']
          },
        ],
      });

      if (result) {
        res.json(createResponse(result));
      } else {
        res.json(createResponse(null, 'Card not found with this id', true));
      }
    }
  } catch (error) {
    next(error.message);
  }
};
