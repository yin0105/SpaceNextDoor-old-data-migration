const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('promotions_customer_buys', {
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
      type: DataTypes.ENUM("MIN_DAYS","MIN_PRICE"),
      allowNull: false
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'promotions_customer_buys',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "promotions_customer_buys_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "promotions_customer_buys_promotion_id",
        fields: [
          { name: "promotion_id" },
        ]
      },
    ]
  });
};
