const express = require('express');

const app = express();

app.use(express.json());

// import Routes
const usersRoute = require('./routes/api/users');
const loginRoute = require('./routes/auth/login');
const activityRoute = require('./routes/api/activityList');

//route being used as a middleware
app.use('/api/users', usersRoute);

app.use('/api/login', loginRoute);

app.use('/api/activities', activityRoute);

//ROUTES
app.get('/', (req, res) => {
  res.send('Wecome to the Api');
})


// listening on PORT
app.listen(process.env.PORT || '3500', () => {
  console.log(`server is running on port: ${process.env.PORT || '3500'}`)
})
