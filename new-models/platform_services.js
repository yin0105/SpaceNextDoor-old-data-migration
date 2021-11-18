const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('platform_services', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title_en: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    title_th: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    title_jp: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    title_kr: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description_en: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description_th: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description_jp: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description_kr: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    icon: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    third_party_provider: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    price_per_hour: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    fixed_price: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM("PICK_UP"),
      allowNull: false
    },
    frequency: {
      type: DataTypes.ENUM("ONE_TIME","RECURRING"),
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
    tableName: 'platform_services',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "platform_services_id",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "platform_services_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
