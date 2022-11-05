module.exports = (sequelize, DataTypes) => {
  const lost_historytbl = sequelize.define('lost_historytbl', {
    Card_No: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    User_ID: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
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
    Reffered_to: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return lost_historytbl;
};
