const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('double_entry_line_metadata', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    line_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    key: {
      type: DataTypes.STRING(48),
      allowNull: false
    },
    value: {
      type: DataTypes.STRING(64),
      allowNull: false
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
    tableName: 'double_entry_line_metadata',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "double_entry_line_metadata_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "lines_meta_line_id_key_value_idx",
        fields: [
          { name: "line_id" },
          { name: "key" },
          { name: "value" },
        ]
      },
    ]
  });
};
