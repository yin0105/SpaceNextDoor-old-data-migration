const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('districts', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name_en: {
      type: DataTypes.STRING(70),
      allowNull: false
    },
    name_th: {
      type: DataTypes.STRING(70),
      allowNull: false
    },
    name_jp: {
      type: DataTypes.STRING(70),
      allowNull: false
    },
    name_kr: {
      type: DataTypes.STRING(70),
      allowNull: false
    },
    old_district_code: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cities',
        key: 'id'
      }
    },
    location: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'districts',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "districts_id",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "districts_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
