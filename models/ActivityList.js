const mongoose = require('mongoose')

const ActivitySchema = mongoose.Schema({
  activity: {
    type: String,
    required: true
  },
  week: {
    type: String,
    required: true
  },
  day: {
    type: String,
    required: true
  },
  month: {
    type: String,
    required: true
  },
  isCompleted: {
    type: Boolean,
    required: true
  }
})

module.exports = mongoose.model('Activities', ActivitySchema);
