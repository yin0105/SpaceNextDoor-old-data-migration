const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('active_admin_comments', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    namespace: {
      type: DataTypes.STRING,
      allowNull: true
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    resource_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    resource_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'active_admin_comments',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "active_admin_comments_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "index_active_admin_comments_on_author_type_and_author_id",
        fields: [
          { name: "author_type" },
          { name: "author_id" },
        ]
      },
      {
        name: "index_active_admin_comments_on_namespace",
        fields: [
          { name: "namespace" },
        ]
      },
      {
        name: "index_active_admin_comments_on_resource_type_and_resource_id",
        fields: [
          { name: "resource_type" },
          { name: "resource_id" },
        ]
      },
    ]
  });
};
