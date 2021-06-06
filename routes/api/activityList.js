const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
// const uuid = require('uuid');
const activitiesData = require('../../models/ActivityList');
// let verifyToken = require('../auth/verifyToken')

//Get All Activities
router.get('/', (req, res) => {

  res.send(activitiesData);

});

// CREATING NEW ACTIVITY
router.post('/', (req, res) => {

  const newActivity = {
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
  const data = req.params.id
  if(!data) return res.send('');

  const dayTodolist = activitiesData.filter(activityList => activityList.day === data)
  const weekTodolist = activitiesData.filter(activityList => activityList.week === data)
  const monthTodolist = activitiesData.filter(activityList => activityList.month === data)
  if (dayTodolist.length || weekTodolist.length || monthTodolist.length) {
    res.status(200).send({ success: true, data: { day:[...dayTodolist], week: [...weekTodolist], month: [...monthTodolist] }, message: `your ${data} todolist is here` })
  } else {
    res.status(400).send({ success: false, message: `no todolist for ${data} here` })
  }
})

// Ability to mark an activity as completed
router.put('/:id', (req, res) => {
  const updateCompleted = activitiesData.some(user => user.id === parseInt(req.params.id))

  if (updateCompleted) {
    const updateCompleted = req.body
    activitiesData.forEach(element => {
      if (element.id === parseInt(req.params.id)) {
        element.isCompleted = updateCompleted.isCompleted ? updateCompleted.isCompleted : element.isCompleted
        res.send({msg: 'isCompleted changed', element});
      }
    })
  } else {
    res.json('data not found');
  }
});

module.exports = router;