const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  taskDescription: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  isActive: {
    type: Boolean,
    default: true
  }
})

const taskModel = new mongoose.model('task',taskSchema)

module.exports = taskModel