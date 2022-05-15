const express = require('express');
const auth = require('../../middlewares/auth');
const userauth = require('../../middlewares/user.auth');
const validate = require('../../middlewares/validate');
const userConfessionValidation = require('../../validations/userConfession.validation');
const userConfessionController = require('../../controllers/userConfession.controller');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(
    auth('manageConfessions'), //jwt and permission verification
    userauth, //verify if the user is same
    validate(userConfessionValidation.createConfession),
    userConfessionController.createConfession
  )
  .get(
    auth('getConfessions'),
    userauth,
    validate(userConfessionValidation.getConfessions),
    userConfessionController.getConfessions
  );

router
  .route('/:confessionId')
  .get(
    auth('getConfessions'),
    userauth,
    validate(userConfessionValidation.getConfession),
    userConfessionController.getConfession
  )
  .patch(
    auth('manageConfessions'),
    userauth,
    validate(userConfessionValidation.updateConfession),
    userConfessionController.updateConfession
  )
  .delete(
    auth('manageConfessions'),
    userauth,
    validate(userConfessionValidation.deleteConfession),
    userConfessionController.deleteConfession
  );

module.exports = router;
