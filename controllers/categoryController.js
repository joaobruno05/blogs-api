const categoryService = require('../services/categoryService');

const create = async (req, res, next) => {
  try {
    const { name } = req.body;

    const category = await categoryService.createCategory(name);

    return res.status(201).json(category);
  } catch (error) {
    console.log(`Error create category: ${error.message}`);
    next(error);
  }
};

module.exports = {
  create,
};
