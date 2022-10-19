const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const moment = require('moment');


// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// View Engine
app.set('view engine', 'ejs');

// Static Files
app.use(express.static('public'));

// app.use(express.json());

// Routes
const userRouter = require('./routes/user.js');
const projectRouter = require('./routes/project.js');
app.use('/users', userRouter);
app.use(["/project", "/projects"], projectRouter);

// Express server
app.listen(3000, () => {
  console.log("Server running.");
});

