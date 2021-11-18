const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bookings_promotions_customer_buys', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    booking_promotion_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'bookings_promotions',
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
    tableName: 'bookings_promotions_customer_buys',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "bookings_promotions_customer_buys_booking_promotion_id",
        fields: [
          { name: "booking_promotion_id" },
        ]
      },
      {
        name: "bookings_promotions_customer_buys_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
