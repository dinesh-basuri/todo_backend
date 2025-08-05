const express = require('express')
const Router = express.Router()
const taskController = require('../controllers/taskController')

Router.route('/').get(taskController.getTaskList).post(taskController.createTask)
// Router.route('/:id').get(taskController.getTaskById)
Router.route('/delete').post(taskController.deleteTask)
Router.route('/update').post(taskController.updateTask)

module.exports = Router
