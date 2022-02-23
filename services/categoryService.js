const errorDefault = require('../errors/errorDefault');
const { Category } = require('../models');

const createCategory = async (name) => {
  if (!name) throw (errorDefault(400, '"name" is required'));

  const category = await Category.create({ name });

  return category;
};

const getAllCategories = async () => {
  const categories = await Category.findAll();

  return categories;
};

module.exports = {
  createCategory,
  getAllCategories,
};
