const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('double_entry_account_balances', {
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
    balance: {
      type: DataTypes.INTEGER,
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
    tableName: 'double_entry_account_balances',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "double_entry_account_balances_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "index_account_balances_on_account",
        fields: [
          { name: "account" },
        ]
      },
      {
        name: "index_account_balances_on_scope_and_account",
        unique: true,
        fields: [
          { name: "scope" },
          { name: "account" },
        ]
      },
    ]
  });
};
