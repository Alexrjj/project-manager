const db = require('../config/db.js');

module.exports = userService = {
  getAll: async () => {
    return db("users").select(
      "users.id",
      "users.name",
      "users.username",
      "users.created_at");
  },
  getByUsername: async (username) => {
    return db("users").where("username", username);
  },
  
  userExists: async (username) => {
    return db("users").select("username").where("username", username)
  },
  
  create: async (name, username, password) => {
    await db("users").insert({
      name: name,
      username: username,
      password: password
    });
  },
  
  update: async (id, user) => {
    return db("users").where("id", id).update({
      name: user.name,
      password: user.password,
      username: user.username,
    });
  },
  
  delete: async(id) => {
    return db("users").where("id", id).del();
  }
};