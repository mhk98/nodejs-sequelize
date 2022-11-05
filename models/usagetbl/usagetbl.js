module.exports = (sequelize, DataTypes) => {
  const UsageTbl = sequelize.define(
    'usagetbl',
    {
      Usage_ID: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      Card_No: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true,
      },
      chargeTime_start: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      chargeTime_end: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      charge_Amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      chargepreAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      chargepostAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Last_Vehicle: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      Toll_Gate_No: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Tunnel_Entry_Point: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      chargeStatus: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      updatedAt: false,
    },
  );

  return UsageTbl;
};
