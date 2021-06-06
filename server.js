const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();
app.use(express.json());

// import Routes
const usersRoute = require('./routes/api/users');
const loginRoute = require('./routes/auth/login');
const activityRoute = require('./routes/api/activityList');

// connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('err', err => console.log(err))
db.once('open', () => console.log('Connected to Database'))







//route being used as a middleware
app.use('/api/users', usersRoute);
app.use('/api/login', loginRoute);
app.use('/api/activities', activityRoute);

//ROUTES
app.get('/', (req, res) => {
  res.send(`
  <h1>Welcome to the TODO RESTFUL Api</h1>
  `);
})


// listening on PORT
app.listen(process.env.PORT || '3500', () => {
  console.log(`server is running on port: ${process.env.PORT || '3500'}`)
})

