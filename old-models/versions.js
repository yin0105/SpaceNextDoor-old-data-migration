const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('versions', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    item_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    event: {
      type: DataTypes.STRING,
      allowNull: false
    },
    whodunnit: {
      type: DataTypes.STRING,
      allowNull: true
    },
    object: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    object_changes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    request_id: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'versions',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "index_versions_on_item_type_and_item_id",
        fields: [
          { name: "item_type" },
          { name: "item_id" },
        ]
      },
      {
        name: "versions_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
