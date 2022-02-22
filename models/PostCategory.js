const PostCategory = (sequelize, DataTypes) => {
  const postCategory = sequelize.define('PostCategory', {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  },
  {
    timestamp: false,
  });
  return postCategory;
};

module.exports = PostCategory;
