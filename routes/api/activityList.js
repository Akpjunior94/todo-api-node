const express = require('express');

const jwt = require('jsonwebtoken');

const router = express.Router();

const uuid = require('uuid');

let activitiesData = require('../../data/activityData');

let verifyToken = require('../auth/verifyToken')

//Get All Activities
router.get('/', (req, res) => {
  res.send(activitiesData);
});

// CREATING NEW ACTIVITY
router.post('/', (req, res) => {
  const newActivity = {
    id: uuid.v4(),
    activity: req.body.activity,
    isCompleted : req.body.isCompleted
  }

  if (!newActivity.activity) {
    res.sendStatus(400);
  } else {
    activitiesData.push(newUser)
    res.json({msg:`The Activity: ${newActivity.activity} has been added`,
    activitiesData})
  }
})









module.exports = router;