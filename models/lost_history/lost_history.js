module.exports = (sequelize, DataTypes) => {
  const lost_historytbl = sequelize.define('lost_historytbl', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    // card_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   unique: true,
    // },
    // user_id: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   unique: true,
    // },
    Lost_Date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Last_Balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Balance_Transferred: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Card_Issue: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Reffered_to: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
  });

  return lost_historytbl;
};
