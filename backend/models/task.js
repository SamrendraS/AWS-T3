const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    taskURL: {
      type: String,
      required: true,
    },
    delay: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "scheduled",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    result: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

TaskSchema.index({ status: 1 });

module.exports = Task = mongoose.model("Task", TaskSchema);
