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

const optionsModels = (as, through, foreignkey, otherKey) => ({
  as, through, foreignkey, otherKey,
});

const optionsSequelizeDefine = () => ({
  timestamps: false,
  tableName: 'PostsCategories',
});

module.exports = (sequelize) => {
  const PostCategory = sequelize.define(
    'PostCategory',
    Attributes,
    optionsSequelizeDefine(),
  );

   PostCategory.associate = (models) => {
   models.BlogPost.belongsToMany(
     models.Category,
     optionsModels('categories', PostCategory, 'postId, categoryId'),
    );

   models.Category.belongsToMany(
     models.BlogPost,
     optionsModels('blogPosts', PostCategory, 'categoryId', 'postId'),
    );
  };

  return PostCategory;
};
