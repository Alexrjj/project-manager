const projectService = require("../services/projectService.js");
const express = require('express');
const app = express();

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
      const username = await req.app.locals;
      const project = await projectService.getByUser(username);
      res.json(project);
    } catch (error) {
      next(error);
    }
  },
  
  create: async (req, res, next) => {
    try {
      const username = req.header('username');
      const project = await projectService.create(username, req.body);
      res.json(project);
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
      const project = await projectService.delete(req.header('username'), req.params.id);
      if (project === 1) {
        res.send(`Projeto ${req.params.id} deletado.`);
      } else {
        res.send(`Projeto não encontrado.`);
      }
      // res.json(project);
      
    } catch (error) {
      next(error);
    }
  }
}