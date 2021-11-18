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
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    govid_required: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    spaceable_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    spaceable_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    daily_price_cents: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    daily_price_currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "SGD"
    },
    minimum_rent_days: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    area: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0.0
    },
    height: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    property: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    discount_code: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    auto_extend_slot: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    insurance_enable: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    reasons_for_disapproval: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    rent_payout_type: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 2
    },
    featured: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'spaces',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "index_spaces_on_property",
        fields: [
          { name: "property" },
        ]
      },
      {
        name: "index_spaces_on_spaceable_type_and_spaceable_id",
        fields: [
          { name: "spaceable_type" },
          { name: "spaceable_id" },
        ]
      },
      {
        name: "index_spaces_on_user_id",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "spaces_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
