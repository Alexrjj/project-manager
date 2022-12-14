const projectService = require("../services/projectService.js");
const moment = require('moment');
const userService = require("../services/userService");
// const session = require('express-session');

module.exports = projectController = {
  getById: async (req, res, next) => {
    try {
      const project = await projectService.getById(req.params.id);
      res.json(project);
    } catch (error) {
      next(error);
    }
  },
  
  getByUser: async (req, res, next) => {
    try {
      const username = await req.session.username;
      const projects = await projectService.getByUser(username);
      // res.json(project);
      
      res.render('projects', {
        projects: projects,
        moment: moment
      })
    } catch (error) {
      // next(error);
      res.send('<h1>Você precisa estar logado!</h1>')
    }
  },
  
  registerProject: async (req, res, next) => {
    try {
      res.render('registerProject');
    } catch (error) {
      next(error);
    }
  },
  
  create: async (req, res, next) => {
    try {
      const username = req.session.username;
  
      let titulo = req.body.titulo;
      let cep = req.body.cep;
      let custo = req.body.custo;
      let prazo = req.body.prazo;
      
      if (titulo !== undefined && cep !== undefined && custo !== undefined && prazo !== undefined) {
        const checkProject = await projectService.projectExists(username, titulo)
        if (checkProject.toString() === "") {
          await projectService.create(username, titulo, cep, custo, prazo);
          res.redirect('/projects');
        } else {
          res.send('Projeto existente.');
          // res.redirect('/users/registerUser');
        }
      }
  
      // res.json(user);
      
    } catch (error) {
      next(error);
    }
  },
  
  updatePut: async (req, res, next) => {
    try {
      const project = await projectService.updatePut(req.header('username'), req.params.id, req.body);
      res.json(project);
    } catch (error) {
      next(error);
    }
  },
  
  
  updatePatch: async (req, res, next) => {
    try {
      const project = await projectService.updatePatch(req.header('username'), req.params.id, req.params.done);
      res.json(project);
    } catch (error) {
      next(error);
    }
  },
  
  delete: async (req, res, next) => {
    try {
      let idProject = req.body.idProject;
      await projectService.delete(req.session.username, idProject);
      res.redirect('/projects');
      // res.json(project);
      
    } catch (error) {
      next(error);
    }
  }
}