const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('landmarks', {
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
    district_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'districts',
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'landmarks',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "landmarks_id",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "landmarks_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
