const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('double_entry_lines', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    account: {
      type: DataTypes.STRING(31),
      allowNull: false
    },
    scope: {
      type: DataTypes.STRING(23),
      allowNull: true
    },
    code: {
      type: DataTypes.STRING(47),
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    partner_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    partner_account: {
      type: DataTypes.STRING(31),
      allowNull: false
    },
    partner_scope: {
      type: DataTypes.STRING(23),
      allowNull: true
    },
    detail_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    detail_type: {
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
    tableName: 'double_entry_lines',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "double_entry_lines_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "lines_account_code_created_at_idx",
        fields: [
          { name: "account" },
          { name: "code" },
          { name: "created_at" },
        ]
      },
      {
        name: "lines_account_created_at_idx",
        fields: [
          { name: "account" },
          { name: "created_at" },
        ]
      },
      {
        name: "lines_scope_account_created_at_idx",
        fields: [
          { name: "scope" },
          { name: "account" },
          { name: "created_at" },
        ]
      },
      {
        name: "lines_scope_account_id_idx",
        fields: [
          { name: "scope" },
          { name: "account" },
          { name: "id" },
        ]
      },
    ]
  });
};
