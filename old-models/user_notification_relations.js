const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_notification_relations', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    notification_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user_notification_relations',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "index_user_notification_relations_on_notification_id",
        fields: [
          { name: "notification_id" },
        ]
      },
      {
        name: "index_user_notification_relations_on_user_id",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "user_notification_relations_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
