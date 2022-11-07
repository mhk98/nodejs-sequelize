module.exports = (sequelize, DataTypes) => {
  const RechargeTBL = sequelize.define('recharge', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    // card_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    Transac_Using: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Transac_Time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Transac_Amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Transac_Amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return RechargeTBL;
};
