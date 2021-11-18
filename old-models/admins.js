const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('admins', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    },
    encrypted_password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    },
    reset_password_token: {
      type: DataTypes.STRING,
      allowNull: true
    },
    reset_password_sent_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    remember_created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    sign_in_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    current_sign_in_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    last_sign_in_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    current_sign_in_ip: {
      type: "INET",
      allowNull: true
    },
    last_sign_in_ip: {
      type: "INET",
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    failed_attempts: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    unlock_token: {
      type: DataTypes.STRING,
      allowNull: true
    },
    locked_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Admin"
    }
  }, {
    sequelize,
    tableName: 'admins',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "admins_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "index_admins_on_email",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "index_admins_on_reset_password_token",
        unique: true,
        fields: [
          { name: "reset_password_token" },
        ]
      },
      {
        name: "index_admins_on_unlock_token",
        unique: true,
        fields: [
          { name: "unlock_token" },
        ]
      },
    ]
  });
};
