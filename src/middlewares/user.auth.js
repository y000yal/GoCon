const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const userauth = async (req, res, next) => {
  if (req.params.userId === req.user.id) {
    next();
  } else {
    return next(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
  }
};

module.exports = userauth;
