const express = require('express');

const jwt = require('jsonwebtoken');

const router = express.Router();

const uuid = require('uuid');

let userData = require('../../data/userData');

// login
router.post('/', (req, res) => {

  // check if user is already in the database
  
  // check if email and password exist

  const userWithEmail = userData.some(user => user.email === req.params.email)

  // if (!userWithEmail) {
  //   res.json({ message: 'Email or Password Doesnot Match'})
  // }

  // if (userWithEmail.password !== password) {
  //   res.json({ message: 'Email or Password Doesnot Match'})
  // }

  jwt.sign({userWithEmail}, 'secretkey', (err, token) => {
    res.send({
      token
    })
  })
});



module.exports = router;