const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('booking_slots', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    space_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'spaces',
        key: 'id'
      }
    },
    date: {
      type: DataTypes.DATEONLY,
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
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'booking_slots',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "booking_slots_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "index_booking_slots_on_space_id",
        fields: [
          { name: "space_id" },
        ]
      },
      {
        name: "index_booking_slots_on_status",
        fields: [
          { name: "status" },
        ]
      },
    ]
  });
};
