const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('addresses', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    addressable_type: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    addressable_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    area: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    street_address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: true
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    postal_code: {
      type: DataTypes.STRING(16),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'addresses',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "addresses_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "index_addresses_on_addressable_id",
        fields: [
          { name: "addressable_id" },
        ]
      },
      {
        name: "index_addresses_on_addressable_type",
        fields: [
          { name: "addressable_type" },
        ]
      },
      {
        name: "index_addresses_on_area",
        fields: [
          { name: "area" },
        ]
      },
      {
        name: "index_addresses_on_city",
        fields: [
          { name: "city" },
        ]
      },
      {
        name: "index_addresses_on_country",
        fields: [
          { name: "country" },
        ]
      },
      {
        name: "index_addresses_on_latitude_and_longitude",
        fields: [
          { name: "latitude" },
          { name: "longitude" },
        ]
      },
    ]
  });
};
