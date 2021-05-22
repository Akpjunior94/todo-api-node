const express = require('express');

const jwt = require('jsonwebtoken');

const router = express.Router();

const uuid = require('uuid');

let userData = require('../../data/userData');

let verifyToken = require('../auth/verifyToken')


//Get All Users
router.get('/', (req, res) => {
  res.send(userData);
});

//Get Users by Id
router.get('/:id', (req, res) => {
  const singleUser = userData.some(user => user.id === parseInt(req.params.id))

  if (singleUser) {
    res.send(userData.filter(user => user.id === parseInt(req.params.id)))
  } else {
    res.sendStatus(400);
  }
});

//CREATING NEW USERS
router.post('/', /*verifyToken,*/ (req, res) => {
  // create new User by giving a unique id
  const newUser = {
    id: uuid.v4(),
    name: req.body.name,
    email : req.body.email,
    password: req.body.password
  }

  //check if a similar email exist
  const emailCheck = userData.some(user => user.email === newUser.email)
  // console.log(emailCheck)

  if (emailCheck) {
    res.status(400).send({ message: `user with the ${newUser.email} already exist` })
  } else {
    userData.push(newUser)
    res.json({msg:`The User: ${newUser.name} has been added to the Database`,
    userData})
  }



  // jwt.verify(req.token, 'secretkey', (err, authData) => {
  //   if (err) {
  //     res.sendStatus(403)
  //   }else {
  //     res.json({
  //       message: "User Created...",
  //       authData
  //     })
  //   }
  // })

  
});

//UPDATING USER
router.put('/:id', (req, res) => {
  const singleUser = userData.some(user => user.id === parseInt(req.params.id))

  if (singleUser) {
    const updateUser = req.body
    userData.forEach(user => {
      if (user.id === parseInt(req.params.id)) {
        user.name = updateUser.name ? updateUser.name : user.name
        user.email = updateUser.email ? updateUser.email : user.email
        res.send({msg: 'User updated', user});
      }
    })
  } else {
    res.json('Data Not FOund in the DB KINDLY SIGN-UP/REGISTER');
  }
});

//DELETING USER
router.delete('/:id', (req, res) => {
  const singleUser = userData.some(user => user.id === parseInt(req.params.id))

  if (singleUser) {
    userData = userData.filter(user => user.id === parseInt(req.params.id))
    res.send({
      msg:'USER DELETED',
      userData
    })
  } else {
    res.sendStatus(400);
  }
});




module.exports = router;