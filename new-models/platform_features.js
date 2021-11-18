const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('platform_features', {
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
    description_en: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description_th: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description_jp: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description_kr: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    icon: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM("SITE","SPACE"),
      allowNull: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'platform_feature_categories',
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
    tableName: 'platform_features',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "platform_features_id",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "platform_features_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
