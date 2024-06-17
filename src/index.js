const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {PORT} = require('./config/serverConfig'); 
const apiRoutes = require('./routes/index');

// const UserRepository = require('./repository/user-repository')

const prepareAndStartServer= async ()=>{
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use('/api', apiRoutes);
  app.listen(PORT, async () => {
    // const userRepository = new UserRepository();
    // const user =  await userRepository.getById(4);
    // console.log(user);

    console.log(`Server is running on port ${PORT}`);
  });
}

prepareAndStartServer();