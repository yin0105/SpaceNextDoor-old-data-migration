const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('double_entry_line_aggregates', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    function: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    account: {
      type: DataTypes.STRING(31),
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(47),
      allowNull: true
    },
    scope: {
      type: DataTypes.STRING(23),
      allowNull: true
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    week: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    day: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hour: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    filter: {
      type: DataTypes.STRING,
      allowNull: true
    },
    range_type: {
      type: DataTypes.STRING(15),
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
    tableName: 'double_entry_line_aggregates',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "double_entry_line_aggregates_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "line_aggregate_idx",
        fields: [
          { name: "function" },
          { name: "account" },
          { name: "code" },
          { name: "year" },
          { name: "month" },
          { name: "week" },
          { name: "day" },
        ]
      },
    ]
  });
};
