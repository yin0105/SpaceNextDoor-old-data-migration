const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ratings', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ratable_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ratable_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rate: {
      type: DataTypes.DOUBLE,
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
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'orders',
        key: 'id'
      }
    },
    note: {
      type: DataTypes.TEXT,
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
    rater_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ratings',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "index_ratings_on_order_id",
        fields: [
          { name: "order_id" },
        ]
      },
      {
        name: "index_ratings_on_ratable_type_and_ratable_id",
        fields: [
          { name: "ratable_type" },
          { name: "ratable_id" },
        ]
      },
      {
        name: "index_ratings_on_user_id",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "ratings_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
