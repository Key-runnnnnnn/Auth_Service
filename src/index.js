const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

const db = require('./models/index');

// const UserService = require('./services/user-service')

const prepareAndStartServer = async () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use('/api', apiRoutes);
  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    // const userService = new UserService();
    // const newToken = userService.createToken({ email: 'kiran@admin234.com', id: 1 });
    // console.log("new token is", newToken);

    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoia2lyYW5AYWRtaW4yMzQuY29tIiwiaWQiOjF9LCJpYXQiOjE3MTg2MDg3MzIsImV4cCI6MTcxODYxMjMzMn0.fR5FVyzCj7asLaGnaeAlevuiN3MtWFaW5dALOBKBitQ"

    // const verify= userService.verifyToken(token)
    // console.log("verify", verify)


    if (process.env.DB_SYNC) {
      console.log("Database is in sync mode")
      await db.sequelize.sync({ alter: true });
    }
  });
}

prepareAndStartServer();