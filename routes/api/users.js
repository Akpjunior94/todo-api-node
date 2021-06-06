const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../../models/User');

// creating a middleware for the :ID route to avoid repiting codes
async function getUser(req, res, next) {
  let user
  try {
    user =await User.findById(req.params.id)
    if (user == null) {
      return res.status(404).json({ message: 'cannot find user' })
    }
  } catch (err) {
    return res.status(500).json({message: err.message})
  }

  res.user = user
  next()
}

//Get All Users
router.get('/', async (req, res) => { 
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});

//Get Users by Id -- Getting One
router.get('/:id', getUser, (req, res) => {
  res.json(res.user)
});

//CREATING NEW USERS
router.post('/', async (req, res) => {
  // create new User by giving a unique id
  const user = new User ( {
    // id: uuid.v4(),
    name: req.body.name,
    email : req.body.email,
    password: req.body.password
  })

  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({message: err.message})
  }

  //check if a similar email exist
  // const emailCheck = User.some(element => element.email === user.email)


  // if (emailCheck) {
  //   res.status(400).send({ message: `user with the ${user.email} already exist` })
  // } else {
  //   user.save()
  //   res.json({msg:`The User: ${user.name} has been added to the Database`,
  //   userData})
  // }

  
});

//UPDATING USER
router.put('/:id',getUser, async (req, res) => {
 if (req.body.name != null) {
   res.user.name = req.body.name
 }
 if (req.body.email != null) {
   res.user.email = req.body.email
 }
 try {
   const updatedUser = await res.user.save()
   res.json(updatedUser)
 } catch (err) {
   res.status(400).json({message: err.message})
 }
});

//DELETING USER
router.delete('/:id', getUser, async (req, res) => {
 try {
   await res.user.remove()
   res.json({message: 'Deleted Subscriber'})
 } catch (err) {
   res.status(500).json({ message: err.message })
 }
});

module.exports = router;