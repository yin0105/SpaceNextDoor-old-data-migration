const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('site_rules', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    site_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sites',
        key: 'id'
      }
    },
    rule_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'platform_rules',
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
    tableName: 'site_rules',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "site_rules_id",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "site_rules_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
