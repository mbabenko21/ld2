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
		if (req.account === undefined) {
			res.render("login_page/page.jade", {
				locale: res.app.get("locale")
			});
		} else {
			res.writeHead(302, {
				'Location': '/cabinet.html'
				//add other headers here...
			});
			res.end();
		}
	},
	/**
	 *
	 * //TODO: Здесь должна выполняться авторизация и редирект в кабинет
	 * @param req
	 * @param res
	 */
	authAction: function(req, res) {
		if (req.params.format == 'json') {
			Auth.login(req, res);
		}
	},
	/**
	 * Регистрация нового пользователя
	 * @param  {object} req Request
	 * @param  {object} res Response
	 * @return {void}
	 */
	registrationAction: function(req, res) {
		if (req.params.format == 'json') {
			Reg.regAccount(req, res);
		}
	},
	/**
	 * Разлогивание
	 * @param  {object} req Request
	 * @param  {object} res Response
	 * @return {void}
	 */
	logoutAction: function(req, res) {
		Auth.logout(req, res);
	}
});


exports.LoginController = function() {
	return new LoginController();
}