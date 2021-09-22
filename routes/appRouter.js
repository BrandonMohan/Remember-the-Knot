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

router.post('/lists', asyncHandler(async (req, res) => {
  const { listName } = req.body
  const { userId } = req.session.auth;
  const list = await db.List.create({
    listName,
    userOwner: userId
  });
  console.log(list.id)

  res.json({ id: list.id, listName: list.listName });
}))

// return all tasks that belongs to list
router.get(
  '/lists/:id/tasks',
  asyncHandler(async (req, res) => {
    console.log('testing task hit');
    const tasks = await db.Task.findAll({ where: { listId: req.params.id } });
    if (tasks) {
      console.log(tasks);
      res.json({ tasks });
    }
  })
);



module.exports = router;
