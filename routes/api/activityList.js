const express = require('express');
const router = express.Router();
const ActivityList = require('../../models/ActivityList');

//Get All Activities
router.get('/', async (req, res) => {
  try {
    const activityLists = await ActivityList.find({})
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
router.get('/week', async(req, res)=> {
  
  const {week, day, month} = req.body
  try {
    const activityLists = await ActivityList.find({"week": week})
    if (activityLists) {
      res.json(activityLists)
    } else {
      res.status(404).json({ message: `No Activity for ${week}` })
    }
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

router.get('/day', async(req, res)=> {
  
  const {day} = req.body
  try {
    const activityLists = await ActivityList.find({"day": day})
    if (activityLists) {
      res.json(activityLists)
    } else {
      res.status(404).json({ message: `No Activity for ${day}` })
    }
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

router.get('/month', async(req, res)=> {
  
  const {month} = req.body
  try {
    const activityLists = await ActivityList.find({"month": month})
    
    if (activityLists) {
      console.log(ActivityList)
      res.json(activityLists)
    } else {
      return res.status(404).json({ message: `No Activity for the month of ${month}` })
    }
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

// Ability to mark an activity as completed
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id
    await ActivityList.findById(id, function (err, activityList) {
      activityList.isCompleted = !activityList.isCompleted
      activityList.save(function (err, result) {
        if (err) {
          console.log('ERROR!');
        }
        if (result) {
          res.status(200).json({msg: "isCompleted Updated"})
        }
      })
    })
    
  } catch (err) {
     res.status(500).json({message: err.message})
  }

});


module.exports = router;