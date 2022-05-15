const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const confessionValidation = require('../../validations/confession.validation');
const confessionController = require('../../controllers/confession.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageConfessions'), validate(confessionValidation.createConfession), confessionController.createConfession)
  .get(auth('getConfessions'), validate(confessionValidation.getConfessions), confessionController.getConfessions);

router
  .route('/:confessionId')
  .get(auth('getConfessions'), validate(confessionValidation.getConfession), confessionController.getConfession)
  .patch(auth('manageConfessions'), validate(confessionValidation.updateConfession), confessionController.updateConfession)
  .delete(auth('manageConfessions'), validate(confessionValidation.deleteConfession), confessionController.deleteConfession);

module.exports = router;
