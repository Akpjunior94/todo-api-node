const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const uuid = require('uuid');

const User = require('../../models/User');

// login
router.post('/', (req, res) => {

  // check if user is already in the database
  
  // check if email and password exist
  const { email, password} = req.body;
  // console.log({email, User})

  const userWithEmail = User.some(user => user.email === email)
  const userWithPassword = User.some(user => user.password === password)

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