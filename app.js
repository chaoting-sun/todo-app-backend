const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const todoRouter = require("./controllers/todos");
const middleware = require("./utils/middleware");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB!");
  })
  .catch((err) => {
    console.log("error connecting to MongoDB", err.message);
  });

const app = express();

app.use(cors());

app.use(express.json()); // parse data with Content-Type application/json
app.use(middleware.requestLogger);

app.use("/api/todos", todoRouter);

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;