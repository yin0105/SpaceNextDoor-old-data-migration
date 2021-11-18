const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bookings', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    customer_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    customer_email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    customer_phone_number: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    move_in_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    move_out_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    commitment_months: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    old_booking_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    auto_renewal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    space_size: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    space_height: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    is_deposit_refunded: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    deposit_refunded_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deposited_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    space_width: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    space_length: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    space_size_unit: {
      type: DataTypes.ENUM("sqm","sqft"),
      allowNull: true
    },
    space_price_per_month: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    currency: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    currency_sign: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    site_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    short_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    site_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    site_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sites',
        key: 'id'
      }
    },
    space_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'spaces',
        key: 'id'
      }
    },
    insurance_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'platform_insurances',
        key: 'id'
      }
    },
    is_insured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    status: {
      type: DataTypes.ENUM("ACTIVE","CANCELLED","COMPLETED","CONFIRMED","RESERVED","TERMINATED"),
      allowNull: false,
      defaultValue: "RESERVED"
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    provider_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    site_address_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'booking_site_addresses',
        key: 'id'
      }
    },
    base_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    insurance_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    total_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    discount_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    sub_total_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false
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
    tableName: 'bookings',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "bookings_id",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "bookings_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
