const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('platform_insurances', {
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
    third_party_provider: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    covered_amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price_per_day: {
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
    tableName: 'platform_insurances',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "platform_insurances_id",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "platform_insurances_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
