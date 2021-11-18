const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ids_counter', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    last_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: "ids_counter_type_key"
    }
  }, {
    sequelize,
    tableName: 'ids_counter',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "ids_counter_id",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "ids_counter_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "ids_counter_type",
        fields: [
          { name: "type" },
        ]
      },
      {
        name: "ids_counter_type_key",
        unique: true,
        fields: [
          { name: "type" },
        ]
      },
    ]
  });
};
