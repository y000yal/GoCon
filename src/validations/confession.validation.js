const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createConfession = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    user_id: Joi.string().custom(objectId),
  }),
};

const getConfessions = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getConfession = {
  params: Joi.object().keys({
    confessionId: Joi.string().custom(objectId),
  }),
};

const updateConfession = {
  params: Joi.object().keys({
    confessionId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      description: Joi.string(),
    })
    .min(1),
};

const deleteConfession = {
  params: Joi.object().keys({
    confessionId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createConfession,
  getConfessions,
  getConfession,
  updateConfession,
  deleteConfession,
};
