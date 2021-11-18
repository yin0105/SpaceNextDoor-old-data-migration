const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bookings_promotions', {
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
    description_en: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description_th: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description_jp: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description_kr: {
      type: DataTypes.STRING(255),
      allowNull: true
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
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'bookings',
        key: 'id'
      }
    },
    promotion_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'promotions',
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
    tableName: 'bookings_promotions',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "bookings_promotions_booking_id",
        fields: [
          { name: "booking_id" },
        ]
      },
      {
        name: "bookings_promotions_code",
        fields: [
          { name: "code" },
        ]
      },
      {
        name: "bookings_promotions_format",
        fields: [
          { name: "format" },
        ]
      },
      {
        name: "bookings_promotions_id",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "bookings_promotions_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "bookings_promotions_status",
        fields: [
          { name: "status" },
        ]
      },
    ]
  });
};
