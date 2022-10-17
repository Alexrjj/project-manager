const db = require("../config/db");
// const axios = require('axios');

module.exports = projectService = {
  getAll: async () => {
    return db("projects")
      .join("users", "users.username", "projects.username")
      .select(
        "users.*",
        "projects.*"
      );
  },
  getById: async (id) => {
    return db("projects")
      .join('users', 'users.username', 'projects.username')
      .select(
        'users.username',
        'projects.title',
        'projects.zip_code',
        'projects.cost',
        'projects.done',
        'projects.deadline')
      .where("projects.id", id);
    
    // const zip_code = result[0]['zip_code']
    // const res = (await axios.get(`https://viacep.com.br/ws/${zip_code}/json/`)).data;
    // console.log(`${res['localidade']} / ${res['uf']}`);
    // return [result, [res['localidade'], res['uf']]];
  },
  
  getByUser: async (username) => {
    return db("projects")
      .join('users', 'users.username', 'projects.username')
      .select(
        'users.username',
        'projects.id',
        'projects.title',
        'projects.zip_code',
        'projects.cost',
        'projects.done',
        'projects.deadline')
      .where("projects.username", username)
  },
  
  create: async (username, project) => {
    console.log(project.title)
    console.log(project.zip_code)
    console.log(project.cost)
    console.log(project.done)
    console.log(project.deadline)
    console.log(username)
    return db("projects")
      .insert([
        {
          title: project.title,
          zip_code: project.zip_code,
          cost: project.cost,
          done: project.done,
          deadline: project.deadline,
          username: username
        }
      ]);
  },
  
  updatePut: async (username, id, body) => {
    return db("projects")
      .where("id", id)
      .andWhere("username", username)
      .update(body);
    
  },
  
  updatePatch: async (username, id, isDone) => {
    if (isDone === 'done') {
      return db("projects")
        .where("id", id)
        .andWhere("username", username)
        .update({done: 'true'});
    }
  },
  
  delete: async (username, id) => {
    return db("projects")
      .where("id", id)
      .andWhere("username", username)
      .del();
  },
};