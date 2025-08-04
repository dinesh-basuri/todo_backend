const taskModel = require("../models/taskModel");

exports.getTaskList = async (req, res) => {
  try {
    const list = await taskModel.find();
    if (list) {
     return res.status(200).json({
        status: true,
        list: list?.filter((item) => item?.isActive == true),
      });
    } else {
      return res.status(204).json({
        status: true,
        message: 'Task list is empty'
      })
    }
  } catch (err) {
    res.status(404).json({
      status: false,
      message: err,
    });
  }
};

exports.createTask = async (req, res) => {
  try {
    const reqBody = req.body

    if(reqBody?.taskDescription !== "") {
      await taskModel.create(reqBody)
      return res.status(200).json({
        status: true,
        message: 'Task created successfully'
      })
    } else {
      return res.status(400).json({
        status: false,
        message: 'Task Description should not be empty'
      })
    }
  } catch (err) {
    res.status(404).json({
      status: false,
      message: err,
    });
  }
};

// exports.getTaskById = async (req, res) => {
//   try {
//     const {id} = req.params
//     if(id) {
//       let task = await taskModel.findById(id)
//       if(task) {
//         return res.status(200).json({
//           status: true,
//           task
//         })
//       } else {
//         return res.status(204).json({
//           status: true,
//           message: 'No task found with the given ID'
//         })
//       }
//     } else {
//       return res.status(400).json({
//         status: false,
//         message: 'Please provide task ID'
//       })
//     }
//   } catch (err) {
//     res.status(404).json({
//       status: false,
//       message: err,
//     });
//   }
// };

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        status: false,
        message: 'Please provide task ID',
      });
    }

    const task = await taskModel.findOne({ _id: id });
    if (!task) {
      return res.status(404).json({
        status: false,
        message: 'No task found with the given ID',
      });
    }

    await taskModel.findByIdAndUpdate(id, { isActive: false });

    return res.status(200).json({
      status: true,
      message: 'Task deleted successfully',
    });

  } catch (err) {
    return res.status(500).json({
      status: false,
      message: 'Internal server error',
      error: err.message,
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id, taskDescription } = req.body;

    if (!id || !taskDescription) {
      return res.status(400).json({
        status: false,
        message: 'Please provide both task ID and description',
      });
    }

    const task = await taskModel.findById(id); // cleaner than findOne({ _id: id })
    if (!task) {
      return res.status(404).json({
        status: false,
        message: 'No task found with the given ID',
      });
    }

    await taskModel.findByIdAndUpdate(id, { taskDescription });

    return res.status(200).json({
      status: true,
      message: 'Task updated successfully',
    });

  } catch (err) {
    return res.status(500).json({
      status: false,
      message: 'Internal server error',
      error: err.message,
    });
  }
};

