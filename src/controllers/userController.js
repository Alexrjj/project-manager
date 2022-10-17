const userService = require("../services/userService.js");
module.exports = userController = {
  getAll: async (req, res, next) => {
    try {
      const users = await userService.getAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  },
  
  getById: async (req, res, next) => {
    try {
      const user = await userService.getById(req.params.id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
  
  create: async (req, res, next) => {
    try {
      const user = await userService.create(req.body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
  
  update: async (req, res, next) => {
    try {
      const user = await userService.update(req.params.id, req.body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
  
  // delete: async (req, res, next) => {
  //   try {
  //     const user = await userService.delete(req.params.id);
  //     res.json(user);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}