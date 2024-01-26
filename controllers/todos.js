const todoRouter = require("express").Router();
const Todo = require("../models/todo");

// return all todos
todoRouter.get("/", async (request, response, next) => {
  try {
    const todos = await Todo.find({});
    response.json(todos);
  } catch (err) {
    next(err);
  }
});

// create a todo
todoRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const todo = new Todo({
    detail: body.detail,
    isCompleted: body.isCompleted,
  });
  try {
    const savedNote = await todo.save();
    response.status(201).json(savedNote); // 201: Created
  } catch (err) {
    next(err);
  }
});

// update a todo
todoRouter.patch("/:id", async (request, response, next) => {
  const partOfTodo = request.body;

  try {
    const updatedNote = await Todo.findByIdAndUpdate(
      request.params.id,
      partOfTodo,
      { new: true } // return the modified document
    );
    response.json(updatedNote);
  } catch (err) {
    next(err);
  }
});

// delete a todo
todoRouter.delete("/:id", async (request, response) => {
  try {
    await Todo.findByIdAndDelete(request.params.id);
    response.status(204).end(); // 204: no content
  } catch (err) {
    next(err);
  }
});

module.exports = todoRouter;
