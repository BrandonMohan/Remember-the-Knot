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

router.get(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    // return all list from userId
    const { userId } = req.session.auth;

    res.render('app');
  })
);

router.get(
  '/lists',
  asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;
    const lists = await db.List.findAll({ where: { userOwner: userId } });
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
    let taskArr = [];
    for (let task of tasks) {
      if (task.taskName.includes(term)) taskArr.push(task.taskName);
    }
  })
);

module.exports = router;
