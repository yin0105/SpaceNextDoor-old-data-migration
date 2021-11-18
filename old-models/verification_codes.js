const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('verification_codes', {
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
      allowNull: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    expiry_at: {
      type: DataTypes.DATE,
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
    tableName: 'verification_codes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "index_verification_codes_on_expiry_at",
        fields: [
          { name: "expiry_at" },
        ]
      },
      {
        name: "index_verification_codes_on_type_and_code",
        fields: [
          { name: "type" },
          { name: "code" },
        ]
      },
      {
        name: "index_verification_codes_on_user_id",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "verification_codes_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
