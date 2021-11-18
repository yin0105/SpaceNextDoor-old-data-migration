const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('prices', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    space_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'spaces',
        key: 'id'
      }
    },
    price_per_day: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    price_per_week: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    price_per_month: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    price_per_year: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    currency: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    currency_sign: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(255),
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
    tableName: 'prices',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "prices_id",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "prices_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
