const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('admin_action_logs', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    admin_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'admins',
        key: 'id'
      }
    },
    target_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    target_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    event: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    request_id: {
      type: DataTypes.STRING,
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
    tableName: 'admin_action_logs',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "admin_action_logs_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "index_admin_action_logs_on_admin_id",
        fields: [
          { name: "admin_id" },
        ]
      },
    ]
  });
};
