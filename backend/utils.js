const axios = require("axios");
const Task = require("./models/task");
const express = require("express");
const mongoose = require("mongoose");

allTasks = new Map();

const request = function executeLambda(taskID, taskURL) {
  // 1. Set taskID as running
  // 2. Get request
  // 3. Set taskID as completed
  //   4. Drop from map
  console.log(taskID, taskURL);
  mongoose.set("useFindAndModify", false);
  Task.findByIdAndUpdate(taskID, { status: "running" }, { new: true })
    .then((item) => {
      return;
    })
    .catch((error) => {
      console.log(error);
    });

  axios
    .get(taskURL)
    .then(function (response) {
      // handle success
      console.log(response.data);
      const updateVals = {
        status: "completed",
        result: response.data,
      };

      mongoose.set("useFindAndModify", false);
      Task.findByIdAndUpdate(taskID, updateVals, { new: true })
        .then((item) => {
          return;
        })
        .catch((error) => {
          console.log("error updating completed");
        });
    })
    .catch(function (error) {
      // handle error
      console.log("error");
      mongoose.set("useFindAndModify", false);
      Task.findByIdAndUpdate(taskID, { status: "failed" }, { new: true })
        .then((item) => {
          return;
        })
        .catch((error) => {
          console.log("error updating failed");
        });
    })
    .then(function () {
      clearTimeout(allTasks.get(taskID));
      allTasks.delete(taskID);
    });
};

exports.allTasks = allTasks;
exports.executeLambda = request;
