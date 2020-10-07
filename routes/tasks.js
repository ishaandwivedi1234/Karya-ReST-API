const express = require("express");
const { Task, validateTask, validateTaskId } = require("../models/task");
const auth = require("../middlewares/auth");
const route = express.Router();

route.post("/", auth, async (req, res) => {
  const { error } = validateTask(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const task = Task({
    userId: req.body.userId,
    taskTitle: req.body.taskTitle,
    taskDescription: req.body.taskDescription,
    status: req.body.status,
    dateCreated: Date.now(),
  });
  const result = await task.save();
  res.send(result);
});

route.get("/:id", auth, async (req, res) => {
  const { error } = validateTaskId(req.params.id);
  if (error) return res.status(400).send("invalid id");
  const task = await Task.findById(req.params.id);
  if (!task) res.status(404).send("no task with this id");

  res.send(task);
});

route.get("/user/:userId", auth, async (req, res) => {
  const { error } = validateTaskId(req.params.userId);
  if (error) return res.status(400).send("invalid user id");
  var d = new Date();
  var pastTime = d.getTime() - 86400000;
  var currTime = d.getTime();
  // console.log(d);
  const task = await Task.find({
    userId: req.params.userId,
    dateCreated: { $gte: pastTime, $lte: currTime },
  });

  if (!task) res.status(404).send("no task with this user id");
  res.send(task);
  console.log(task);
});

route.put("/:id", auth, async (req, res) => {
  const { error } = validateTaskId(req.params.id);
  if (error) return res.status(400).send("invalid task id");
  let task = await Task.findOne({ _id: req.params.id });
  if (!task) res.status(404).send("no task found");
  const { error1 } = validateTask(req.body);
  if (error1) return res.status(400).send(error1.details[0].message);
  task = await task.set({
    taskTitle: req.body.taskTitle,
    taskDescription: req.body.taskDescription,
    status: req.body.status,
  });
  task = await task.save();

  res.send(task);
});

route.delete("/:id", auth, async (req, res) => {
  const { error } = validateTaskId(req.params.id);
  if (error) return res.status(400).send("invalid task id");
  const task = await Task.findByIdAndRemove(req.params.id);
  if (!task) res.status(404).send("Invalid task id");
  res.send(task);
});

module.exports = route;
