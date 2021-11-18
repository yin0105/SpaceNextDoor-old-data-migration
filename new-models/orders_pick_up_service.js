const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders_pick_up_service', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    lat: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    lng: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    pickup_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    currency: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    currency_sign: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    discount_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    total_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'platform_services',
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
    tableName: 'orders_pick_up_service',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "orders_pick_up_service_id",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "orders_pick_up_service_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
