const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('platform_space_types', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    size_from: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    size_to: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    unit: {
      type: DataTypes.ENUM("sqm","sqft"),
      allowNull: false
    },
    name_en: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    name_th: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    name_jp: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    name_kr: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    icon: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    size: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'countries',
        key: 'id'
      }
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'platform_space_types',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "platform_space_types_id",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "platform_space_types_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
