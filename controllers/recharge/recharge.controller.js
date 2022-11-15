const { createResponse } = require('../../utils/responseGenerator');
const db = require('../../models');
const Recharge = db.recharge;
const Card = db.cardtbl;

// Post operation for insert data
module.exports.rechargeInsert = async (req, res) => {
  try {
    const {
      id,
      BankType,
      rechargeTime,
      rechargeTime_end,
      recharge_Amount,
      rechargepreAmount,
      rechargepostAmount,
      rechargeStatus,
    } = req.body;
    if (
      !id ||
      !BankType ||
      !rechargeTime ||
      !rechargeTime_end ||
      !recharge_Amount ||
      !rechargepreAmount ||
      !rechargepostAmount ||
      !rechargeStatus
    ) {
      res.json(createResponse(true, null, 'Parameter missing'));
    } else {
      const result = await Recharge.create({
        id,
        BankType,
        rechargeTime,
        rechargeTime_end,
        recharge_Amount,
        rechargepreAmount,
        rechargepostAmount,
        rechargeStatus: 'pending',
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

// Get operation for fetch data in ui
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Tutorial.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving tutorials.',
      });
    });
};
// module.exports.getRechargeById = async (req, res, next) => {
//   try {
//     const { id } = req.body;
//     if (!id) {
//       res.json(createResponse(null, 'recharge card not found', true));
//     }

//     else {
//       const result = await Recharge.findOne({
//         where: {
//           id: id
//         }

//       });

//       if (result) {
//         res.json(createResponse(result))
//       }
//       else {
//         res.json(createResponse(null, "Card can not be recharged", true))
//       }
//     }
//   }
//   catch (error) {
//     next(error.message)
//   }
// }

// get all cards of a user using card no
module.exports.getRechargeById = async (req, res, next) => {
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
            model: Recharge,
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
