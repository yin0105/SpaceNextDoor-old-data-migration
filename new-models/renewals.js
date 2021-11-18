const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('renewals', {
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
    deposit_amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'transactions',
        key: 'id'
      }
    },
    insurance_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'platform_insurances',
        key: 'id'
      }
    },
    promotion_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'promotions',
        key: 'id'
      }
    },
    booking_promotion_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'bookings_promotions',
        key: 'id'
      }
    },
    next_renewal_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    renewal_start_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    renewal_end_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    renewal_paid_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM("PAID","UN_PAID","FAILED"),
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM("BOOKING","FULL_SUBSCRIPTION","PARTIAL_SUBSCRIPTION"),
      allowNull: false
    },
    base_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    insurance_amount: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    total_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    discount_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    sub_total_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false
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
    tableName: 'renewals',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "renewals_id",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "renewals_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
