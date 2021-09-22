var express = require('express');
var router = express.Router();
const {
  asyncHandler,
  handleValidationErrors,
  csrfProtection
} = require('./utils');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../db/models');
const { loginUser, logoutUser, requireAuth } = require('../auth');
const { ResultWithContext } = require('express-validator/src/chain');

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.auth) {
    res.redirect('/app')
  } else {
  res.render('home-page', { title: 'Home Page' });
}});

const userValidators = [
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for First Name')
    .isLength({ max: 50 })
    .withMessage('First Name must not be more than 50 characters long'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Last Name')
    .isLength({ max: 50 })
    .withMessage('Last Name must not be more than 50 characters long'),
  check('emailAddress')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Email Address')
    .isLength({ max: 255 })
    .withMessage('Email Address must not be more than 255 characters long')
    .isEmail()
    .withMessage('Email Address is not a valid email')
    .custom((value) => {
      return db.User.findOne({ where: { emailAddress: value } }).then(
        (user) => {
          if (user) {
            return Promise.reject(
              'The provided Email Address is already in use by another account'
            );
          }
        }
      );
    }),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password')
    .isLength({ max: 50 })
    .withMessage('Password must not be more than 50 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    .withMessage(
      'Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'
    ),
  check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Confirm Password')
    .isLength({ max: 50 })
    .withMessage('Confirm Password must not be more than 50 characters long')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirm Password does not match Password');
      }
      return true;
    })
];

router.get('/signup', csrfProtection, function (req, res) {
  if (req.session.auth) {
    res.redirect('/app')
  }
  const user = db.User.build();
  res.render('sign-up', {
    user,
    csrfToken: req.csrfToken()
  });
});

router.post(
  '/signup',
  csrfProtection,
  userValidators,
  asyncHandler(async (req, res) => {
    const { firstName, lastName, emailAddress, password } = req.body;
    const user = db.User.build({
      firstName,
      lastName,
      emailAddress
    });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.hashedPassword = hashedPassword;
      await user.save();
      loginUser(req, res, user);
      const { userId } = req.session.auth;
      const newList = db.List.create({
        listName: 'testinglist',
        userOwner: userId
      });
      console.log(newList);
      res.redirect('/app');
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('sign-up', {
        title: 'Sign Up',
        user,
        errors,
        csrfToken: req.csrfToken()
      });
    }
  })
);

const loginValidators = [
  check('emailAddress')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Email Address'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password')
];

router.get('/login', csrfProtection, (req, res) => {
  res.render('log-in', {
    csrfToken: req.csrfToken()
  });
});

router.post(
  '/login',
  csrfProtection,
  loginValidators,
  asyncHandler(async (req, res) => {
    const { emailAddress, password } = req.body;

    let errors = [];
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const user = await db.User.findOne({ where: { emailAddress } });

      if (user !== null) {
        const passwordMatch = await bcrypt.compare(
          password,
          user.hashedPassword.toString()
        );

        if (passwordMatch) {
          loginUser(req, res, user);
          return res.redirect('/app');
        }
      }
      errors.push('Login failed for the provided email and password');
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
    }

    res.render('log-in', {
      emailAddress,
      errors,
      csrfToken: req.csrfToken()
    });
  })
);

router.post('/logout', (req, res) => {
  logoutUser(req, res);
  res.redirect('/login');
});

module.exports = router;
