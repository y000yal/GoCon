const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { confessionService } = require('../services');

const createConfession = catchAsync(async (req, res) => {
  Object.assign(req.body, {user_id: req.params.userId});
  const confession = await confessionService.createConfession(req.body);
  res.status(httpStatus.CREATED).send(confession);
});

const getConfessions = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await confessionService.queryConfessions(filter, options);
  res.send(result);
});

const getConfession = catchAsync(async (req, res) => {
  const confession = await confessionService.getConfessionById(req.params.confessionId);
  if (!confession) {
    throw new ApiError(httpStatus.NOT_FOUND, 'confession not found');
  }
  res.send(confession);
});

const updateConfession = catchAsync(async (req, res) => {
  const confession = await confessionService.updateConfessionById(req.params.confessionId, req.body);
  res.send(confession);
});

const deleteConfession = catchAsync(async (req, res) => {
  await confessionService.deleteConfessionById(req.params.confessionId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createConfession,
  getConfessions,
  getConfession,
  updateConfession,
  deleteConfession,
};
