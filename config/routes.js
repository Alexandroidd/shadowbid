var express = require('express');
var router = express.Router();
// Parses information from POST
var bodyParser = require('body-parser');
// Used to manipulate POST methods
var methodOverride = require('method-override');
var passport = require("passport");
var usersController = require('../controllers/users');
var staticsController = require('../controllers/statics');
var bidsController = require('../controllers/bidController');

function authenticatedUser(req, res, next) {
	// If the user is authenticated, then we continue the execution
	if (req.isAuthenticated()) return next();
	// Otherwise the request is always redirected to the home page
	res.redirect('/');
}

router.route("/myaccount")
	.get(authenticatedUser, usersController.myaccount);

router.route('/myaccount/item')
  .get(bidsController.getBids);

router.route('/')
  .get(staticsController.home);

router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup);

router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin);

router.route("/logout")
  .get(usersController.getLogout);

module.exports = router;
