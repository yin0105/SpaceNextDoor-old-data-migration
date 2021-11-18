const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('countries', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name_en: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "countries_name_en_key"
    },
    name_th: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "countries_name_th_key"
    },
    name_jp: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "countries_name_jp_key"
    },
    name_kr: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "countries_name_kr_key"
    },
    code: {
      type: DataTypes.STRING(5),
      allowNull: false,
      unique: "countries_code_key"
    },
    currency: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    currency_sign: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'countries',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "countries_code_key",
        unique: true,
        fields: [
          { name: "code" },
        ]
      },
      {
        name: "countries_id",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "countries_name_en_key",
        unique: true,
        fields: [
          { name: "name_en" },
        ]
      },
      {
        name: "countries_name_jp_key",
        unique: true,
        fields: [
          { name: "name_jp" },
        ]
      },
      {
        name: "countries_name_kr_key",
        unique: true,
        fields: [
          { name: "name_kr" },
        ]
      },
      {
        name: "countries_name_th_key",
        unique: true,
        fields: [
          { name: "name_th" },
        ]
      },
      {
        name: "countries_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
