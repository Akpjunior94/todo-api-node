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
  // check if user already exist
  
  const {email} = req.body

  try {
    const userExist = await User.findOne({email: email})

    if (userExist) {
      return res.status(422).json({error: "User with this Email Already Exist"})
    }

    const user = new User ( {
      name: req.body.name,
      email : req.body.email,
      password: req.body.password
    })

    const newUser = await user.save()
    res.status(201).json({msg: "NEW USER HAS BEEN CREATED", newUser})
    
  } catch (err) {
    res.status(400).json({message: err.message})
  }
  
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