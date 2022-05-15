const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const confessionRoute = require('./confession.route');
const userConfessionRoute = require('./userConfession.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/confessions',
    route: confessionRoute,
  },
  {
    path: '/users/:userId/confessions',
    route: userConfessionRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});



module.exports = router;
