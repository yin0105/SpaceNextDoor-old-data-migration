const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('platform_rules', {
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
    icon: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    created_by: {
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
    tableName: 'platform_rules',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "platform_rules_id",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "platform_rules_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
