module.exports = (sequelize, DataTypes) => {
  const CardTbl = sequelize.define(
    'cardtbls',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      Device_Type: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true,
      },
      Physical_ID: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },

      Issue_Date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      Expire_Date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      last_chargeamounte: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      last_chargeTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'Pending',
      },
    },
    {
      updatedAt: false,
    },
  );

  return CardTbl;
};
