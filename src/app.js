const express  = require('express')
const app = express();
app.use(express.json());

const userRouter = require('./routes/user.js');
const projectRouter = require('./routes/project.js');

app.use('/users', userRouter);
app.use(["/project", "/projects"], projectRouter);

app.listen(3000, () => {
  console.log("Server running.");
});

