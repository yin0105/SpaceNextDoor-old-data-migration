const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('double_entry_line_checks', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    last_line_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    errors_found: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    log: {
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
    }
  }, {
    sequelize,
    tableName: 'double_entry_line_checks',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "double_entry_line_checks_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
