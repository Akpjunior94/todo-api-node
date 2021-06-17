const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcryptjs');
// const uuid = require('uuid');

const User = require('../../models/User');

// login
router.post('/', (req, res) => {

  const { email, password } = req.body


  // check for empty fields
  if (email == "" || password == "") {
    res.status(400).json({error: "Please fill in the empty fields"})
  } else {
    // check if user exist
    User.find({email})
    .then(data => {
      if (data.length) {
        const hashedPassword = data[0].password;
        bcrypt.compare(password, hashedPassword).then(result => {
          if (result) {
            // password match
            res.json({
              status: "SUCCESS",
              message: "Signin Successful",
              data: data
            })
          } else {
            res.json({
              status: "FAILED",
              message: "Invalid Password Entered"
            })
          }
        })
        .catch(err =>{
          res.json({
            status: "FAILED",
            message: "An error Occured While Comparing Password"
          })
        })
      } else {
        res.json({
          status: "FAILED",
          message: "Invalid Credentials ENtered"
        })
      }
    })
    .catch( err => {
      res.json({
        status: "FAILED",
        message: "An error Occured while checking for existing Users"
      })
    })
  }
  
});



module.exports = router;