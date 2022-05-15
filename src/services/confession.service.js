const httpStatus = require('http-status');
const { Confession } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 *
 * @param {*} confessionBody
 * @returns
 */
const createConfession = async (confessionBody) => {
  return Confession.create(confessionBody);
};

/**
 * Query for confessions
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryConfessions = async (filter, options) => {
  const confessions = await Confession.paginate(filter, options);
  return confessions;
};

/**
 * Get confession by id
 * @param {ObjectId} id
 * @returns {Promise<Confession>}
 */
const getConfessionById = async (id) => {
  return Confession.findOne({deleted_at:null,_id:id});
};

/**
 * Update Confession by id
 * @param {ObjectId} confessionId
 * @param {Object} updateBody
 * @returns {Promise<Confession>}
 */
const updateConfessionById = async (confessionId, updateBody) => {
  const confession = await getConfessionById(confessionId);
  if (!confession) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Confession not found');
  }

  Object.assign(confession, updateBody);
  await confession.save();
  return confession;
};

/**
 * Delete Confession by id
 * @param {ObjectId} confessionId
 * @returns {Promise<Confession>}
 */
const deleteConfessionById = async (confessionId) => {
  const confession = await getConfessionById(confessionId);
  if (!confession) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Confession not found');
  }
  Object.assign(confession, {deleted_at:new Date()});
  await confession.save();
  return confession;
};

const getUserConfessions = async (req) => {
  const confession = Confession.find({ user_id: req.params.userId });
  if (!confession) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Confession not found');
  }
  return confession;
};

module.exports = {
  createConfession,
  queryConfessions,
  getConfessionById,
  updateConfessionById,
  deleteConfessionById,
  getUserConfessions,
};
