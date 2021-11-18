const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('promotions_customer_gets', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    promotion_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'promotions',
        key: 'id'
      }
    },
    type: {
      type: DataTypes.ENUM("FIXED_AMOUNT_DISCOUNT","PERCENTAGE_DISCOUNT","TOTAL_AMOUNT"),
      allowNull: false
    },
    value: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    max_amount_per_booking: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    for_type: {
      type: DataTypes.ENUM("FIRST_MONTHS","LAST_MONTHS"),
      allowNull: false
    },
    for_value: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'promotions_customer_gets',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "promotions_customer_gets_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "promotions_customer_gets_promotion_id",
        fields: [
          { name: "promotion_id" },
        ]
      },
      {
        name: "promotions_customer_gets_type",
        fields: [
          { name: "type" },
        ]
      },
    ]
  });
};
