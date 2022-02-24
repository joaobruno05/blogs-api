const { DataTypes } = require('sequelize');

const Attributes = {
  postId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  categoryId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
};

module.exports = (sequelize) => {
  const PostCategory = sequelize.define(
    'PostCategory',
    Attributes,
    {
      timestamps: false,
      tableName: 'PostsCategories',
    },
  );
  return PostCategory;
};
