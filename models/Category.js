const Category = (sequelize, DataTypes) => {
  const category = sequelize.define('Category', {
    name: DataTypes.STRING,
  },
  {
    timestamp: false,
  });
  return category;
};

module.exports = Category;
