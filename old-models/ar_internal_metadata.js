const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ar_internal_metadata', {
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    value: {
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
    tableName: 'ar_internal_metadata',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "ar_internal_metadata_pkey",
        unique: true,
        fields: [
          { name: "key" },
        ]
      },
    ]
  });
};
