const mongoose = require("mongoose");
require("dotenv").config();

// define todo schema
const todoSchema = new mongoose.Schema({
  detail: {
    type: String,
    required: true,
  },
  isCompleted: Boolean,
});

// define custom toJSON for returned objects
todoSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

// get Mongoose model as a constructor function
const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
