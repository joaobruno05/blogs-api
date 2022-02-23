const userService = require('../services/userService');

const create = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;

    const user = await userService.createUser(displayName, email, password, image);

    return res.status(201).json(user);
  } catch (error) {
    console.log(`Error create user: ${error.message}`);
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.log(`Error get all user: ${error.message}`);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await userService.getUserById(id);

    return res.status(200).json(user);
  } catch (error) {
    console.log(`Error get by id: ${error.message}`);
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
};
