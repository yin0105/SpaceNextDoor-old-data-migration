const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('images', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    imageable_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    imageable_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    secure_token: {
      type: DataTypes.STRING,
      allowNull: true
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    height: {
      type: DataTypes.INTEGER,
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'images',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "images_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "index_images_on_imageable_type_and_imageable_id",
        fields: [
          { name: "imageable_type" },
          { name: "imageable_id" },
        ]
      },
      {
        name: "index_images_on_secure_token",
        unique: true,
        fields: [
          { name: "secure_token" },
        ]
      },
    ]
  });
};
