const express = require('express');

const jwt = require('jsonwebtoken');

const router = express.Router();

const uuid = require('uuid');

let userData = require('../../data/userData');

// login
router.post('/', (req, res) => {

  // check if user is already in the database
  
  // check if email and password exist

  const { email, password} = req.body;
  console.log({email, userData})

  const userWithEmail = userData.some(user => user.email === email)
  const userWithPassword = userData.some(user => user.password === password)

  if (!userWithEmail || !userWithPassword) {
    res.json({ message: 'Email or Password Doesnot Match', success: false })
  }

  jwt.sign({userWithEmail, userWithPassword}, 'secretkey', (err, token) => {
    res.send({
      token,
      success: true,
      message: `USER IS LOGGED IN`
    })
  })
});



module.exports = router;