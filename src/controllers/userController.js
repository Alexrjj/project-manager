const userService = require("../services/userService.js");
const moment = require('moment');
const express = require('express');
const app = express();
const expressBasicAuth = require('express-basic-auth')

app.use(expressBasicAuth({authorizer: customAuthorizer}));


function customAuthorizer(username, password, db_username, db_password) {
  const userMatches = expressBasicAuth.safeCompare(username.toString(), db_username)
  const passwordMatches = expressBasicAuth.safeCompare(password.toString(), db_password)
  
  return userMatches & passwordMatches
}

module.exports = userController = {
  basicAuth: async(req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(403).send('É necessário estar logado.');
      }
      
      const encoded = authHeader.substring(6);
      const decoded = Buffer.from(encoded.toString(), 'base64').toString('ascii');
      
      try {
        const [username, password] = decoded.split(':');
        const dbUserInfo = await userService.getByUsername(username);
        const dbUsername = dbUserInfo[0].username;
        const dbPassword = dbUserInfo[0].password;
        
        const isAuthorized = customAuthorizer(username, password, dbUsername, dbPassword)
        
        if (!isAuthorized) {
          return res.status(403).send('Usuário ou senha incorreta.');
        }
        
        if (req.header('username') !== dbUsername) {
          return res.status(403).send('Usuário enviado pelo header não autorizado!');
        }
      } catch (error) {
        if (res.status(403)){
          return res.status(403).send('Usuário ou senha incorreta.');
        }
      }
      
      next();
    } catch (error) {
      next(error);
    }
  },
  
  getAll: async (req, res, next) => {
    try {
      const users = await userService.getAll();
      // res.json(users);
      res.render('users', {
        users: users,
        moment: moment
      });
    } catch (error) {
      next(error);
    }
  },
  
  getById: async (req, res, next) => {
    try {
      const user = await userService.getByUsername(req.params.id);
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
  
  delete: async (req, res, next) => {
    try {
      let idUser = req.body.idUser;
      await userService.delete(idUser);
      // res.json(user);
      res.redirect('/users')
    } catch (error) {
      next(error);
    }
  }
}