const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
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
    first_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gender: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
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
    confirmation_token: {
      type: DataTypes.STRING,
      allowNull: true
    },
    confirmed_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    confirmation_sent_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    unconfirmed_email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone_confirmation_token: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone_confirmation_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    phone_confirmation_sent_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    unconfirmed_phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gov_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    unconfirmed_gov_id: {
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
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: true
    },
    uid: {
      type: DataTypes.STRING,
      allowNull: true
    },
    notifications_seen_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    biography: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    preferred_phone: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "index_users_on_confirmation_token",
        unique: true,
        fields: [
          { name: "confirmation_token" },
        ]
      },
      {
        name: "index_users_on_email",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "index_users_on_phone_confirmation_token",
        unique: true,
        fields: [
          { name: "phone_confirmation_token" },
        ]
      },
      {
        name: "index_users_on_reset_password_token",
        unique: true,
        fields: [
          { name: "reset_password_token" },
        ]
      },
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
