const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('promotions_redeem', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'bookings',
        key: 'id'
      }
    },
    promotion_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'promotions',
        key: 'id'
      }
    },
    booking_promotion_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'bookings_promotions',
        key: 'id'
      }
    },
    renewal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'renewals',
        key: 'id'
      }
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.fn('now')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'promotions_redeem',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "promotions_redeem_booking_id",
        fields: [
          { name: "booking_id" },
        ]
      },
      {
        name: "promotions_redeem_booking_promotion_id",
        fields: [
          { name: "booking_promotion_id" },
        ]
      },
      {
        name: "promotions_redeem_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "promotions_redeem_promotion_id",
        fields: [
          { name: "promotion_id" },
        ]
      },
      {
        name: "promotions_redeem_renewal_id",
        fields: [
          { name: "renewal_id" },
        ]
      },
    ]
  });
};
