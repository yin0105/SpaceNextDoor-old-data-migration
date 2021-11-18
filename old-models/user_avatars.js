const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_avatars', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'user_avatars',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "index_user_avatars_on_user_id",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "user_avatars_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
