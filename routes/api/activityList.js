const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
// const uuid = require('uuid');
const ActivityList = require('../../models/ActivityList');
// let verifyToken = require('../auth/verifyToken')

//Get All Activities
router.get('/', async (req, res) => {
  try {
    const activityLists = await ActivityList.find()
    res.json(activityLists)
  } catch (err) {
    res.status(500).json({message: err.message})
  }

});

// CREATING NEW ACTIVITY
router.post('/', async (req, res) => {
  const activityList = new ActivityList ( {
    activity: req.body.activity,
    week : req.body.week,
    day: req.body.day,
    month: req.body.month,
    isCompleted: req.body.isCompleted
  })

  try {
    const newActivityList = await activityList.save()
    res.status(201).json(newActivityList)
  } catch (err) {
    res.status(400).json({message: err.message})
  }

})

// view activities, day, week and month
router.get('/:id', (req, res)=> {
  const data = req.params.id
  if(!data) return res.send('');

  const dayTodolist = ActivityList.filter(activityList => activityList.day === data)
  const weekTodolist = ActivityList.filter(activityList => activityList.week === data)
  const monthTodolist = ActivityList.filter(activityList => activityList.month === data)
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