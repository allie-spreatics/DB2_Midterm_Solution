const { Todo } = require("../models/index");

exports.readAll = async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.readOne = async (req, res) => {
  try {
    const todo = await Todo.findOne({ where: { id: req.params.id } });

    if (todo) {
      res.json(todo);
    } else {
      res.json({ message: "Todo not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.create = async (req, res) => {
  try {
    const { title, done } = req.body;
    const newTodo = await Todo.create({ title, done });
    res.json(newTodo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.update = async (req, res) => {
  try {
    const { title, done } = req.body;
    const [updateCount] = await Todo.update(
      { title, done },
      { where: { id: req.params.id } }
    );

    if (updateCount > 0) {
      const updatedTodo = await Todo.findOne({ where: { id: req.params.id } });
      res.json(updatedTodo);
    } else {
      res.json({ message: "Todo not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteCount = await Todo.destroy({ where: { id } });

    if (deleteCount > 0) {
      res.json({ message: "Todo deleted successfully", deletedId: id });
    } else {
      res.json({ message: "Todo not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
