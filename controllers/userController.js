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

module.exports = {
  create,
};
