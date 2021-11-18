const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_payment_methods', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    identifier: {
      type: DataTypes.STRING,
      allowNull: true
    },
    expiry_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    token: {
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
    tableName: 'user_payment_methods',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "index_user_payment_methods_on_user_id",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "user_payment_methods_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
