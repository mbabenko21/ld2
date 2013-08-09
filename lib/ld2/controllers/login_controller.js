/**
 * @author Maks Babenko <mbabenko21@gmail.com>
 * @package ld2/controllers
 */

var Backbone = require('backbone'),
	Auth = require("../services/auth_service").Auth(),
	Reg = require("../services/registration_service").Registration(),
	LoginController,
	controller;

LoginController = Backbone.Model.extend({
	indexAction: function(req, res) {
		res.render("login_page/page.jade", {
			locale: res.app.get("locale")
		});
	},
	/**
	 *
	 * //TODO: Здесь должна выполняться авторизация и редирект в кабинет
	 * @param req
	 * @param res
	 */
	authAction: function(req, res) {
		if (req.params.format == 'json') {
			Auth.login("test", "12");
		}
	},

	registrationAction: function(req, res) {
		if (req.params.format == 'json') {
			var acc = req.body.reg;
			Reg.regAccount(acc.email, acc.password, acc.password_confirm);
		}
	}
});


exports.LoginController = function() {
	return new LoginController();
}