const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const taskSchema = mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, required: true },

  taskTitle: { type: String, required: true },
  taskDescription: { type: String, required: true },
  status: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
});

const Task = new mongoose.model("tasks", taskSchema);

function validateTask(task) {
  const schema = {
    userId: Joi.objectId().required(),
    taskTitle: Joi.string().required(),
    taskDescription: Joi.string().required(),
    status: Joi.string().required(),
  };
  return Joi.validate(task, schema);
}

function validateTaskId(taskId) {
  const schema = {
    _id: Joi.objectId(),
  };
  const idObj = { _id: taskId };
  return Joi.validate(idObj, schema);
}

module.exports.Task = Task;
module.exports.validateTask = validateTask;
module.exports.validateTaskId = validateTaskId;
