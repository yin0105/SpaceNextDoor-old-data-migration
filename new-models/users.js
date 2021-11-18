const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'customers',
        key: 'id'
      },
      unique: "users_customer_id_key"
    },
    provider_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'providers',
        key: 'id'
      },
      unique: "users_provider_id_key"
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    stripe_customer_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    roles: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    is_email_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    is_phone_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    facebook_user_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    google_user_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    old_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.fn('now')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "users_customer_id",
        fields: [
          { name: "customer_id" },
        ]
      },
      {
        name: "users_customer_id_key",
        unique: true,
        fields: [
          { name: "customer_id" },
        ]
      },
      {
        name: "users_id",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "users_provider_id",
        fields: [
          { name: "provider_id" },
        ]
      },
      {
        name: "users_provider_id_key",
        unique: true,
        fields: [
          { name: "provider_id" },
        ]
      },
    ]
  });
};
