var Backbone = require('backbone'),
	util = require("util"),
	LoginController = require(__dirname + "/controllers/login_controller").LoginController(),
	IndexController = require(__dirname + "/controllers/index_controller"),
	CabinetController = require(__dirname + "/controllers/cabinet_controller").CabinetController(),
	Auth = require(__dirname + "/services/auth_service").Auth(),
	Router;


Router = Backbone.Model.extend({
	init: function(app) {
		this.methodPost(app);
		this.methodGet(app);
	},

	methodPost: function(app) {
		app.post("/login.:format?", LoginController.authAction);
		app.post("/registration.:format?", LoginController.registrationAction);
		app.post("/logout", LoginController.logoutAction);
	},

	methodGet: function(app) {
		app.get("/", Auth.loadAccount, IndexController.indexAction);
        app.get("/logout", LoginController.logoutAction);
		app.get("/login.:format?", Auth.loadAccount,  LoginController.indexAction);
		app.get("/cabinet.:format?", Auth.loadAccount, CabinetController.indexAction);
	}
});

exports.init = function(app) {
	var router = new Router();
	return router.init(app);
}