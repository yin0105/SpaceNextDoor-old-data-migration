const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('platform_space_category_items', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    unit: {
      type: DataTypes.ENUM("cm"),
      allowNull: false
    },
    height: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    width: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    dimension: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    icon: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'platform_space_categories',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'platform_space_category_items',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "platform_space_category_items_id",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "platform_space_category_items_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
