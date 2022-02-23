const loginService = require('../services/loginService');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userToken = await loginService.login(email, password);

    return res.status(200).json(userToken);
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
};

module.exports = {
  login,
};
