const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('spaces', {
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
      type: DataTypes.STRING(255),
      allowNull: true
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    },
    rejection_reason: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM("ACTIVE","ARCHIVED","DRAFT","IN_ACTIVE","READY_TO_REVIEW","REJECTED"),
      allowNull: false,
      defaultValue: "DRAFT"
    },
    site_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sites',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    platform_space_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'platform_space_types',
        key: 'id'
      }
    },
    size: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    height: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    width: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    length: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    size_unit: {
      type: DataTypes.ENUM("sqm","sqft"),
      allowNull: true
    },
    total_units: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    available_units: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    stock_management_type: {
      type: DataTypes.ENUM("SND","THIRD_PARTY"),
      allowNull: true
    },
    third_party_space_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    old_space_ids: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
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
    tableName: 'spaces',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "spaces_id",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "spaces_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "spaces_stock_management_type",
        fields: [
          { name: "stock_management_type" },
        ]
      },
    ]
  });
};
