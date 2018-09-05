// Imports
var express      = require('express');
var usersCtrl    = require('./controllers/users.controller');

// Router
exports.router = (function() {
  var apiRouter = express.Router();

  // Users routes
  apiRouter.route('/users/').get(usersCtrl.readAll);
  apiRouter.route('/users/register').post(usersCtrl.register);
  apiRouter.route('/users/login').post(usersCtrl.login);
  apiRouter.route('/users/update').post(usersCtrl.update);

  return apiRouter;
})();