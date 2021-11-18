const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payments', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'orders',
        key: 'id'
      }
    },
    rent_cents: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    rent_currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "SGD"
    },
    payment_type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    transaction_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    service_start_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    service_end_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    serial: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    retry_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    deposit_cents: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    deposit_currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "SGD"
    },
    guest_service_fee_cents: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    guest_service_fee_currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "SGD"
    },
    host_service_fee_cents: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    host_service_fee_currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "SGD"
    },
    failed_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    resolved_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    identifier: {
      type: DataTypes.STRING,
      allowNull: true
    },
    error_message: {
      type: DataTypes.TEXT,
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
    insurance_type: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'payments',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "index_payments_on_failed_at_and_status",
        fields: [
          { name: "failed_at" },
          { name: "status" },
        ]
      },
      {
        name: "index_payments_on_identifier",
        fields: [
          { name: "identifier" },
        ]
      },
      {
        name: "index_payments_on_order_id",
        fields: [
          { name: "order_id" },
        ]
      },
      {
        name: "index_payments_on_user_id",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "payments_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
