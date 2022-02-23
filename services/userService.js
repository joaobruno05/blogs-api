const Joi = require('joi');
const { User } = require('../models');
const errorDefault = require('../errors/errorDefault');

const schema = Joi.object({
  displayName: Joi.string().min(8),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
});

const createUser = async (displayName, email, password, image) => {
  const userIsValid = schema.validate({ displayName, email, password });
  
  const { error } = userIsValid;
  
  if (error) throw (errorDefault(400, error.details[0].message));

  const emailAlreadyExist = await User.findOne({
    where: { email },
  });

  if (emailAlreadyExist) throw (errorDefault(409, 'User already registered'));

  const user = await User.create({ displayName, email, password, image });

  return user;
};

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return users;
};

const getUserById = async (id) => {
  const user = await User.findByPk(
    id,
    { attributes: { exclude: ['password'] } },
  );
  
  if (!user) throw (errorDefault(404, 'User does not exist'));

  return user;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};
