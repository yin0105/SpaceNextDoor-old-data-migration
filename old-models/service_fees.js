const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('service_fees', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    host_rate: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    guest_rate: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'orders',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'service_fees',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "index_service_fees_on_order_id",
        fields: [
          { name: "order_id" },
        ]
      },
      {
        name: "service_fees_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
