const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('schedules', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    schedulable_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    schedulable_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    event: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    schedule_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'schedules',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "index_schedules_on_schedulable_id_and_schedulable_type",
        fields: [
          { name: "schedulable_id" },
          { name: "schedulable_type" },
        ]
      },
      {
        name: "index_schedules_on_status_and_schedule_at",
        fields: [
          { name: "status" },
          { name: "schedule_at" },
        ]
      },
      {
        name: "schedules_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
