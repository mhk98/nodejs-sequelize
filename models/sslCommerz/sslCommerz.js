module.exports = (sequelize, DataTypes) => {
  const SSLCommerz = sequelize.define(
    'success',
    {
      tran_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      val_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      card_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      store_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bank_tran_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tran_date: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      card_issuer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      card_brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      updatedAt: false,
    },
  );

  return SSLCommerz;
};
