const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const config = require("config");
const router = express.Router();
const { check, validationResult } = require("express-validator");
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require("normalize-url");

const Task = require("../../models/task");

const utils = require("../../utils");

router.get("/tasks", (req, res) => {
  // return status
  try {
    Task.find()
      .sort("-createdAt") //Return latest tasks
      .limit(100) //Return only 100 tasks
      .then((tasks) => {
        res.status(200).send(tasks);
      })
      .catch((err) => {
        res.status(404).send({ message: "Could not connect" });
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/retrieveTaskInstances", (req, res) => {
  const { task_status } = req.body;
  try {
    Task.find({ status: task_status })
      .sort("-createdAt") //Return latest tasks
      .limit(100) //Return only 100 tasks
      .then((tasks) => {
        var op = tasks.map(function (item) {
          return { id: item._id, status: item.status };
        });
        res.json(op);
      })
      .catch((err) => {
        res.status(404).send({ message: "Could not connect" });
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/retrieveAllTasks", (req, res) => {
  // return status
  try {
    Task.find()
      .sort("-createdAt") //Return latest tasks
      .limit(100) //Return only 100 tasks
      .then((tasks) => {
        var op = tasks.map(function (item) {
          return { id: item._id, status: item.status };
        });
        res.json(op);
      })
      .catch((err) => {
        res.status(404).send({ message: "Could not connect" });
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:task_id", async (req, res) => {
  try {
    console.log(req.params);
    const task = await Task.findOne({
      _id: req.params.task_id,
    }).populate("task", ["taskName"]);

    if (!task) return res.status(400).json({ msg: "Task not found" });
    res.json(task);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Task not found" });
    }
    res.status(500).send("Server Error");
  }
});

router.get("/checkStatus/:task_id", async (req, res) => {
  const { task_id } = req.params;
  try {
    console.log(req.params);
    const task = await Task.findOne({
      _id: task_id,
    }).populate("task", ["taskName"]);

    if (!task) return res.status(400).json({ msg: "Task not found" });
    res.json(task.status);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Task not found" });
    }
    res.status(500).send("Server Error");
  }
});

router.post("/schedule", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { taskURL, timeInMs } = req.body;
  taskName = req.body.taskName || taskURL.replace(/.+\/\/|www.|\..+/g, "");
  const taskFields = new Task({
    taskName,
    taskURL,
    delay: timeInMs,
  });
  console.log(taskFields);
  taskFields
    .save()
    .then((result) => {
      res.status(201).send({ id: result._id });
      var task = setTimeout(function () {
        utils.executeLambda(result._id.toString(), taskURL.toString());
      }, timeInMs);
      utils.allTasks.set(result._id.toString(), task);
      return;
    })
    .catch((err) => {
      console.log(err);
      res.status(409).json({ error: "An error occured" });
      return;
    });
});

// 1. Drop it from the map
// 2. Create new setTimeout instance
// 3, Save it to allTasks
router.delete("/:task_id", async (req, res) => {
  const id = req.params.task_id;
  try {
    if (id) {
      clearTimeout(allTasks.get(id));
      utils.allTasks.delete(id);
      mongoose.set("useFindAndModify", false);
      Task.findByIdAndUpdate(id, { status: "cancelled" }, { new: true })
        .then((item) => {
          if (!item) {
            res.status(404).send({ message: "404: Task not found" });
            return;
          }
          res.status(200).send({ message: "200: Task deleted" });
          return;
        })
        .catch((error) => {
          res.status(500).send(error);
          return;
        });
    } else {
      res.status(404).json({
        message: "No Task",
      });
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Task not found" });
    }
    res.status(500).send("Server Error");
  }
});

router.patch("/cancel", (req, res) => {
  const { task_id } = req.body;
  console.log(req.body);
  clearTimeout(allTasks.get(task_id));
  utils.allTasks.delete(task_id);
  mongoose.set("useFindAndModify", false);
  // 1. Drop it from the map
  // 2. Create new setTimeout instance
  // 3, Save it to allTasks
  Task.findByIdAndUpdate(task_id, { status: "cancelled" }, { new: true })
    .then((item) => {
      console.log(item);
      if (!item || JSON.stringify(item.result) != JSON.stringify({})) {
        res.json("false");
        // res.status(404).send({ result: "false" });
        return;
      }
      res.json("true");
      // res.status(200).send({ result: "true" });
      return;
    })
    .catch((error) => {
      console.log(error);
      res.json("false");
      // res.status(500).send({ result: "false" });
    });
});

router.patch("/modify", (req, res) => {
  const { task_id, timeInMs, taskURL } = req.body;
  console.log(req.body);
  clearTimeout(allTasks.get(task_id));
  utils.allTasks.delete(task_id);
  // 1. Drop it from the map
  // 2. Create new setTimeout instance
  // 3, Save it to allTasks
  var task = setTimeout(function () {
    utils.executeLambda(task_id.toString(), taskURL);
  }, timeInMs);
  utils.allTasks.set(task_id.toString(), task);

  mongoose.set("useFindAndModify", false);
  Task.findByIdAndUpdate(
    task_id,
    { status: "modified", delay: timeInMs },
    { new: true }
  )
    .then((item) => {
      if (!item || JSON.stringify(item.result) != JSON.stringify({})) {
        res.json("false");
        // res.status(404).send({ result: "false" });
        return;
      }
      res.json("true");

      return;
    })
    .catch((error) => {
      console.log(error);
      res.json("false");
    });
});

router.patch("/:task_id", (req, res) => {
  const { task_id, taskURL } = req.params;
  console.log(req.body);
  clearTimeout(allTasks.get(task_id));
  utils.allTasks.delete(task_id);
  if (req.body.status == "modified") {
    var task = setTimeout(function () {
      utils.executeLambda(task_id.toString(), taskURL);
    }, req.body.delay);
    utils.allTasks.set(task_id.toString(), task);
    req.body;
    // what ^
  }
  mongoose.set("useFindAndModify", false);
  // 1. Drop it from the map
  // 2. Create new setTimeout instance
  // 3, Save it to allTasks
  Task.findByIdAndUpdate(task_id, req.body, { new: true })
    .then((item) => {
      if (!item) {
        res.status(404).send({ message: "404: Task not found" });
        return;
      } else if (item.result) {
        res.status(404).send({ message: "404: Task already executed" });
        return;
      }
      res.status(200).send({ message: "200: Task updated" });
      return;
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

module.exports = router;
