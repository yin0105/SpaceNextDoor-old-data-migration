const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bank_accounts', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    country: {
      type: DataTypes.STRING(4),
      allowNull: false
    },
    bank_code: {
      type: DataTypes.STRING(6),
      allowNull: false
    },
    account_name: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    account_number: {
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
    },
    bank_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    branch_code: {
      type: DataTypes.STRING(6),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'bank_accounts',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "bank_accounts_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "index_bank_accounts_on_user_id",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
