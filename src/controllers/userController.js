const userService = require("../services/userService.js");
const moment = require('moment');
const express = require('express');
const session = require('express-session');
const app = express();
const expressBasicAuth = require('express-basic-auth')

app.use(expressBasicAuth({authorizer: customAuthorizer}));


function customAuthorizer(username, password, db_username, db_password) {
  const userMatches = expressBasicAuth.safeCompare(username.toString(), db_username)
  const passwordMatches = expressBasicAuth.safeCompare(password.toString(), db_password)
  
  return userMatches & passwordMatches
}

module.exports = userController = {
  sendHeader: async(req, res, next) => {
    const usernameHeader = req.body.username;
    const passHeader = req.body.password;
    res.append('Access-Control-Expose-Headers', 'authorization');
    res.append('Access-Control-Allow-Origin', '*');
    req.headers.authorization = 'Basic ' + Buffer.from(usernameHeader + ':' + passHeader).toString('base64');
    res.set('username');
    req.headers.username = usernameHeader;
    next();
  },
  
  
  basicAuth: async (req, res, next) => {
    try {
      console.log(req.headers.authorization);
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(403).send('É necessário estar logado.');
      }
      
      const encoded = authHeader.substring(6);
      const decoded = Buffer.from(encoded, 'base64').toString('ascii');
      try {
        const [username, password] = decoded.split(':');
        const dbUserInfo = await userService.getByUsername(username);
        const dbUsername = dbUserInfo[0].username;
        const dbPassword = dbUserInfo[0].password;
        
        const isAuthorized = customAuthorizer(username, password, dbUsername, dbPassword)
        
        if (!isAuthorized) {
          return res.status(403).send('Usuário ou senha incorreta.');
        }
        // res.writeHead('username', username);
  
        if (req.header('username') !== dbUsername) {
          return res.status(403).send('Usuário enviado pelo header não autorizado!');
        }
  
        req.session.loggedin = true;
        req.session.username = username;
        res.redirect('/projects')
      } catch (error) {
        if (res.status(403)) {
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
  
  registerUser: async (req, res, next) => {
    try {
      res.render('registerUser')
    } catch (error) {
      next(error)
    }
  },
  
  create: async (req, res, next) => {
    try {
      let name = req.body.name;
      let username = req.body.username;
      let password = req.body.password;
      
      if (name !== undefined && username !== undefined && password !== undefined) {
        const checkUser = await userService.userExists(username)
        if (checkUser.toString() === "") {
          await userService.create(req.body.name, req.body.username, req.body.password);
          res.redirect('/users');
        } else {
          res.send('Usuário já cadastrado.');
          // res.redirect('/users/registerUser');
        }
      }
      
      // res.json(user);
    } catch (error) {
      next(error);
    }
  },
  
  authUser: async (req, res, next) => {
    try {
      // Capture the input fields
      let username = req.body.username;
      let password = req.body.password;
      // Ensure the input fields exists and are not empty
      if (username && password) {
        // Execute SQL query that'll select the account from the database based on the specified username and password
        const checkUser = userService.authUser(username, password)
        res.json(checkUser)
      }
        // If there is an issue with the query, output the error
        // If the account exists
      //   if (checkUser.length > 0) {
      //     // Authenticate the user
      //     req.session.loggedin = true;
      //     req.session.username = username;
      //     // Redirect to home page
      //     res.redirect('/home');
      //   } else {
      //     res.send('Incorrect Username and/or Password!');
      //   }
      //   res.end();
      // } else {
      //   res.send('Please enter Username and Password!');
      //   res.end();
      // }
      
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