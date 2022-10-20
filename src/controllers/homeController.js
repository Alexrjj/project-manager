const userService = require("../services/userService");
module.exports = homeController = {
  index: async (req, res, next) => {
    try {
      res.render('index');
    } catch (error) {
      next(error);
    }
  },
  
  login: async (req, res, next) => {
    try {
      res.render('login');
    } catch (error) {
      next(error);
    }
  },
}