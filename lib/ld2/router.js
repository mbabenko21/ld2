var Backbone = require('backbone'),
	util = require("util"),
	LoginController = require(__dirname + "/controllers/login_controller").LoginController(),
	Router;


Router = Backbone.Model.extend({
	init: function(app) {
		app.get("/", LoginController.indexAction);
		app.get("/login.:format?", LoginController.indexAction);
		app.post("/login.:format?", LoginController.authAction);
		app.post("/registration.:format?", LoginController.registrationAction);

	}
});

exports.init = function(app) {
	var router = new Router();
	return router.init(app);
}