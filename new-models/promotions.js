const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('promotions', {
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
    format: {
      type: DataTypes.ENUM("PUBLIC","CODE","VOUCHER"),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("DRAFT","ACTIVE","IN_ACTIVE","FINISH"),
      allowNull: false,
      defaultValue: "DRAFT"
    },
    code: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    max: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    max_per_day: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    max_per_customer: {
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
    tableName: 'promotions',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "promotions_code",
        fields: [
          { name: "code" },
        ]
      },
      {
        name: "promotions_format",
        fields: [
          { name: "format" },
        ]
      },
      {
        name: "promotions_id",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "promotions_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "promotions_status",
        fields: [
          { name: "status" },
        ]
      },
    ]
  });
};
