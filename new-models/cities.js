const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cities', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name_en: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    name_th: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    name_jp: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    name_kr: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(5),
      allowNull: false,
      unique: "cities_code_key"
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'countries',
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'cities',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "cities_code_key",
        unique: true,
        fields: [
          { name: "code" },
        ]
      },
      {
        name: "cities_id",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "cities_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
