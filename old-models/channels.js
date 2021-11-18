const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('channels', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    guest_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    space_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    host_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'channels',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "channels_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "index_channels_on_guest_id",
        fields: [
          { name: "guest_id" },
        ]
      },
      {
        name: "index_channels_on_host_id",
        fields: [
          { name: "host_id" },
        ]
      },
      {
        name: "index_channels_on_space_id",
        fields: [
          { name: "space_id" },
        ]
      },
    ]
  });
};
