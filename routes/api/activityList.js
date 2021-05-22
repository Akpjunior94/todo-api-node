const express = require('express');

const jwt = require('jsonwebtoken');

const router = express.Router();

const uuid = require('uuid');

let activitiesData = require('../../data/activityData');

let verifyToken = require('../auth/verifyToken')

//Get All Activities
router.get('/', (req, res) => {
  // activitiesData.filter(data => {

  // })
  res.send(activitiesData);
});

// CREATING NEW ACTIVITY
router.post('/', (req, res) => {

  const newActivity = {
    id: uuid.v4(),
    activity: req.body.activity,
    week: req.body.week,
    day: req.body.day,
    month: req.body.month,
    isCompleted: req.body.isCompleted
  }
   console.log({activitiesData, newActivity})

  const activityCheck = activitiesData.some(user => user.activity === req.body.activity)

  if (activityCheck) {
    res.sendStatus(400);
  } else {
    activitiesData.push(newActivity)
    res.json({msg:`The Activity: ${newActivity.activity} has been added`,
    activitiesData})
  }
})

// view activities, day, week and month
router.get('/:id', (req, res)=> {
  // const data = req.params.id
  const todolist = activitiesData.some(activityList => activityList.id === parseInt(req.params.id)) 

  if (todolist) {
    res.send(activitiesData.filter(activityList => activityList.id === parseInt(req.params.id)))
  } else {
    res.sendStatus(400);
  }
})

// Ability to mark an activity as completed










module.exports = router;