const db = require('../config/db.js');

module.exports = userService = {
  getAll: async () => {
    return db("users").select("users.*");
  },
  getByUsername: async (username) => {
    return db("users").where("username", username);
  },
  create: async (user) => {
    return db("users").insert(user);
  },
  update: async (id, user) => {
    return db("users").where("id", id).update({
      name: user.name,
      password: user.password,
      username: user.username,
    });
  },
};