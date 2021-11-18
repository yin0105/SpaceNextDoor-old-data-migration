const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    total_payment_cycle: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    remain_payment_cycle: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    host_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    guest_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    space_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'spaces',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    start_at: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    end_at: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    cancelled_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    price_cents: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    price_currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "SGD"
    },
    channel_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    damage_fee_cents: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    damage_fee_currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "SGD"
    },
    long_term: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    long_term_cancelled_at: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    discount_code: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    premium_cents: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    premium_currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "SGD"
    },
    insurance_enable: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    insurance_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    insurance_lock: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    add_fee_cents: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    add_fee_currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "SGD"
    },
    reasons_for_adjustment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    long_term_start_at: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    rent_payout_type: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 2
    },
    transform_long_lease_by: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'orders',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "index_orders_on_channel_id",
        fields: [
          { name: "channel_id" },
        ]
      },
      {
        name: "index_orders_on_guest_id",
        fields: [
          { name: "guest_id" },
        ]
      },
      {
        name: "index_orders_on_host_id",
        fields: [
          { name: "host_id" },
        ]
      },
      {
        name: "index_orders_on_long_term",
        fields: [
          { name: "long_term" },
        ]
      },
      {
        name: "index_orders_on_space_id",
        fields: [
          { name: "space_id" },
        ]
      },
      {
        name: "index_orders_on_status",
        fields: [
          { name: "status" },
        ]
      },
      {
        name: "index_orders_on_type",
        fields: [
          { name: "type" },
        ]
      },
      {
        name: "orders_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
