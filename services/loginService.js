require('dotenv').config();
const Joi = require('joi');
const { generateToken } = require('../utils/token');
const errorDefault = require('../errors/errorDefault');
const { User } = require('../models');

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .not().empty()
    .required(),
  password: Joi.string()
    .not().empty()
    .required(),
});

const login = async (email, password) => {
  const loginValidate = loginSchema.validate({ email, password });
  const { error } = loginValidate;

  if (error) throw (errorDefault(400, error.message));

  const user = await User.findOne({
    where: { email },
  });

  if (!user || user.email !== email || user.password !== password) {
    throw (errorDefault(400, 'Invalid fields'));
  }

  const { password: _password, ...userWhithoutPassword } = user;
  const token = generateToken(userWhithoutPassword);
  return { token };
};

module.exports = {
  login,
};
