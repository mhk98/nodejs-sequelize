const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes, Sequelize) => {
  const usertbls = sequelize.define(
    'usertbl',
    {
      User_ID: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      User_Type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      User_FirstName: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      User_LastName: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      User_Email: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
      },
      PIN: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      IDcard: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Passportno: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pass_word: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Mobile_No: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      agent: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSaltSync(10, 'a');
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
      },
    },
  );
  usertbls.prototype.validPassword = async (password, hash) => {
    return await bcrypt.compareSync(password, hash);
  };

  usertbls.prototype.getHashPass = async (password) => {
    const salt = await bcrypt.genSaltSync(10, 'a');
    const hashed = bcrypt.hashSync(password, salt);
    return hashed;
  };

  return usertbls;
};
