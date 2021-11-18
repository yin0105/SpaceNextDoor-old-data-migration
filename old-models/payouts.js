const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payouts', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    payment_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    amount_cents: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    amount_currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "SGD"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    start_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    end_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    actual_paid_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'payouts',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "index_payouts_on_payment_id",
        fields: [
          { name: "payment_id" },
        ]
      },
      {
        name: "index_payouts_on_user_id",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "payouts_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
