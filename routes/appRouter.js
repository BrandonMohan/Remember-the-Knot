var express = require('express');
var router = express.Router();
const {
  asyncHandler,
  handleValidationErrors,
  csrfProtection
} = require('./utils');
const { check, validationResult } = require('express-validator');
const db = require('../db/models');
const { loginUser, logoutUser, requireAuth } = require('../auth');

const dynamicGreeting = async () => {
  const greetingsArr = ['Hello', 'Good Day', 'Hi', 'Welcome back', 'Bonjour', 'Konichiwa', 'Greetings', 'Hola', 'Yo', 'Hey']
  const randomNumber = Math.floor(Math.random() * 10)
  const greeting = greetingsArr[randomNumber]
  return greeting
}

router.get(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    // return all list from userId
    const { userId } = req.session.auth;
    const greeting = await dynamicGreeting()
    const user = await db.User.findByPk(
      userId
    )
    const firstName = user.firstName
    res.render('app', { greeting, firstName });
  })
);

router.get(
  '/lists',
  asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;
    const lists = await db.List.findAll({
      where: { userOwner: userId },
      order: [['id', 'ASC']]
    });
    if (lists) {
      res.json({ lists });
    }
  })
);

router.post(
  '/lists',
  asyncHandler(async (req, res) => {
    const { listName } = req.body;
    const { userId } = req.session.auth;
    const list = await db.List.create({
      listName,
      userOwner: userId
    });

    res.json({ id: list.id, listName: list.listName });
  })
);

router.delete(
  '/lists/:id',
  asyncHandler(async (req, res) => {
    try {
      const id = req.params.id;
      const taskDeletion = await db.Task.destroy({
        where: { listId: id }
      });
      const listDeletion = await db.List.destroy({
        where: { id }
      });
      res.send(200);
    } catch (err) {
      console.log(err);
    }
  })
);

router.put(
  '/lists/:id/edit',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { listName } = req.body;
    const updateListName = db.List.update({ listName }, { where: { id } });
    res.send(200);
  })
);

// return all tasks that belongs to list
router.get(
  '/lists/:id/tasks',
  asyncHandler(async (req, res) => {
    const tasks = await db.Task.findAll({
      where: { listId: req.params.id }
    });
    if (tasks) {
      res.json({ tasks });
    }
  })
);

router.post(
  '/lists/:id/tasks',
  asyncHandler(async (req, res) => {
    const { taskName } = req.body;
    const listId = req.params.id;
    console.log(listId);
    console.log(taskName);
    const task = await db.Task.create({
      taskName,
      listId,
      completed: false
    });
    if (task) {
      res.json({ id: task.id, taskName: task.taskName });
    }
  })
);
router.get(
  '/search',
  requireAuth,
  asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;
    const lists = await db.List.findAll({ where: { userOwner: userId } });
    const userListIds = [];
    let { term } = req.query;
    for (let list of lists) {
      userListIds.push(list.id);
    }
    const tasks = await db.Task.findAll({
      where: { listId: userListIds }
    });
    console.log(tasks);
    let taskArr = [];
    for (let task of tasks) {
      if (task.taskName.includes(term)) taskArr.push(task);
    }
    res.render('search', { taskArr });
  })
);

//UPDATE TASK
router.put(
  '/task/:id/edit',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { editValue } = req.body;
    console.log(id);
    // const tasks = await db.Task.findOne({
    //   where: { id: id }
    // });
    const updateTask = db.Task.update(
      { taskName: editValue },
      { where: { id } }
    );
    res.send(200);
  })
);
module.exports = router;
