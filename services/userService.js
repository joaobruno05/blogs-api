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

module.exports = {
  createUser,
};
