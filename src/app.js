const express = require('express')
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const moment = require('moment');
const homeRouter = require('./routes/home.js');
const userRouter = require('./routes/user.js');
const projectRouter = require('./routes/project.js');

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// View Engine
app.set('view engine', 'ejs');

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Views
app.set('views', path.join(__dirname, '/views'))

// app.use(express.json());

// Routes
app.use('/', homeRouter);
app.use('/users', userRouter);
app.use(["/project", "/projects"], projectRouter);

// Express server
app.listen(3000, () => {
  console.log("Server running.");
});

