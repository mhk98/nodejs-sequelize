const db = require('../../models');
require('dotenv').config();
const { createResponse } = require('../../utils/responseGenerator');
const { getJWT } = require('../../utils/jwt_token');
const User = db.user;

// register
module.exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      res.json(createResponse(null, 'Email or password required', true));
    } else {
      const checkUser = await User.findOne({
        where: {
          email: email,
        },
      });
      if (checkUser) {
        res.json(createResponse(null, 'User Already Exists', true));
      } else {
        const data = await User.create({
          name,
          email,
          password,
        });

        if (data) {
          res.json(
            createResponse(
              null,
              'User Registration Successfull! Please Check Your Email',
            ),
          );
        }
      }
    }
  } catch (error) {
    res.json(createResponse(null, `${error.message}`, true));
  }
};

// Retribe all data
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  User.findAll({ where: condition })
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

// verify user
module.exports.verifyUser = async (req, res) => {
  const { confirmationcode } = req.headers;

  try {
    const exist = await User.findOne({
      where: {
        confirmationCode: confirmationcode,
      },
    });

    if (exist.status !== 'Active') {
      const updated = await User.update(
        { status: 'Active' },
        {
          where: {
            confirmationCode: confirmationcode,
          },
        },
      );

      const message = `<p>Dear ${exist.fullName}</p>
      <p>Your account has been activated! You can now login to the system</p>
      `;
      const subject = 'Account activation successfull';

      if (updated) {
        sendEmail(exist.email, message, subject);
        res.json(createResponse(null, 'Account Verification Successfull'));
      }
    } else {
      res.json(createResponse(null, 'Account already activated', true));
    }
  } catch (error) {
    res.json(createResponse(null, `${error.message}`, true));
  }
};

// login
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.json(createResponse(null, 'Email or password missing', true));
  }
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      res.json(
        createResponse(null, 'User does not found with the email', true),
      );
    } else {
      const isValid = await user.validPassword(password, user.password);
      const token = getJWT(user.email);

      if (isValid) {
        const { dataValues } = user;
        const { password, ...rest } = dataValues;
        rest.token = token;
        res.json(createResponse(rest, 'Login Successfull'));
      } else {
        res.json(createResponse(null, "Password doesn't matched", true));
      }
    }
  } catch (error) {
    console.log('err', error);
    res.json(createResponse(null, `${error.message}`, true));
  }
};

module.exports.getCurrentUser = async (req, res) => {
  try {
    const userEmail = req.email;
    if (!userEmail) {
      res.json(createResponse(null, 'User already loggedout', true));
    }
    const user = await User.findOne({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      res.json(
        createResponse(null, 'User does not found with the email', true),
      );
    } else {
      const { dataValues } = user;
      const { fullName, email, country, status, uid, phone } = dataValues;
      res.json(
        createResponse({ fullName, email, country, status, uid, phone }),
      );
    }
  } catch (error) {
    res.json(createResponse(null, `${error.message}`, true));
  }
};

// change password
module.exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword, email } = req.body;
  //   const uid = req.userId;
  if (!oldPassword || !newPassword) {
    res.json(
      createResponse(null, 'Old Password or New Passoword Missing', true),
    );
  }

  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      res.json(createResponse(null, 'User not found', true));
    }

    const isValid = await user.validPassword(oldPassword, user.password);

    if (isValid) {
      const hashedPass = await user.getHashPass(newPassword);
      await User.update(
        { password: hashedPass },
        {
          where: {
            email: email,
          },
        },
      );
      res.json(createResponse(null, 'Password changed successfully'));
    } else {
      res.json(createResponse(null, "Password doesn't matched", true));
    }
  } catch (error) {
    res.json(createResponse(null, `${error.message}`, true));
  }
};

// refresh token
module.exports.refreshToken = async (req, res) => {
  const email = req.params;
  if (!email) {
    res.json(createResponse(null, 'Unauthorized', true));
  } else {
    const token = getJWT(email);
    res.json(createResponse(token));
  }
};
// get user card by user
module.exports.getCardByUserId = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await User.findOne({
      where: {
        User_Email: email,
      },
      include: [
        {
          model: Card,
          // to check particular data by attributes
          // attributes: ['Device_Type']
        },
      ],
    });

    res.json(createResponse(result));
  } catch (error) {
    console.log(error);
    next(error.message);
  }
};
