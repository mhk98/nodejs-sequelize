module.exports = (sequelize, DataTypes) => {
  const RechargeTBL = sequelize.define(
    'rechargetbl',
    {
      Recharge_ID: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      Card_No: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      BankType: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rechargeTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      rechargeTime_end: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      recharge_Amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rechargepreAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rechargepostAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rechargeStatus: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },

    {
      updatedAt: false,
    },
  );

  return RechargeTBL;
};
