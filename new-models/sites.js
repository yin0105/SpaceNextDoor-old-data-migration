const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sites', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    property_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'platform_property_types',
        key: 'id'
      }
    },
    floor: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    commission_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    provider_type: {
      type: DataTypes.ENUM("INDIVIDUAL","BUSINESS"),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    address_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'site_addresses',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM("ACTIVE","DRAFT","INACTIVE","READY_TO_REVIEW","REJECTED"),
      allowNull: false,
      defaultValue: "DRAFT"
    },
    rejection_reason: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    },
    stock_management_type: {
      type: DataTypes.ENUM("SND","THIRD_PARTY"),
      allowNull: false,
      defaultValue: "SND"
    },
    third_party_provider: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    third_party_site_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    is_featured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
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
    tableName: 'sites',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "sites_id",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "sites_is_featured",
        fields: [
          { name: "is_featured" },
        ]
      },
      {
        name: "sites_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "sites_stock_management_type",
        fields: [
          { name: "stock_management_type" },
        ]
      },
      {
        name: "sites_third_party_site_id",
        fields: [
          { name: "third_party_site_id" },
        ]
      },
    ]
  });
};
