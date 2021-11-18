const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_favorite_space_relations', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    space_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user_favorite_space_relations',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "index_user_favorite_space_relations_on_space_id",
        fields: [
          { name: "space_id" },
        ]
      },
      {
        name: "index_user_favorite_space_relations_on_user_id",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "user_favorite_space_relations_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
