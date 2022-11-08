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
      },
      Physical_ID: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },

      Issue_Date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      Expire_Date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      last_chargeamounte: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      last_chargeTime: {
        type: DataTypes.DATE,
        allowNull: true,
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
