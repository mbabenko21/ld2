/**
 * Create from Sublime Text 3
 * @author Maksim Babenko <mbabenko21@gmail.com>
 * File: auth_listener.js
 * @package /lib/ld2/events
 */

var Backbone = require("backbone"),
	AuthListener, eventEmitter = require('events').EventEmitter,
	logger = require("../logger").Logger({debug_mode: false});

function logged(event) {
	logger.info("Emit event: \x1b[32m\x1b[1m" + event);
}

AuthListener = Backbone.Model.extend({
	/**
	 * Инициализация всех слушателей
	 * @param  {EventEmitter} emitter
	 * @return {void}
	 */
	init: function(emitter) {
		emitter.addListener('authorisation.login', this.userLogginedAction);
		emitter.addListener('authorisation.failed', this.authFailedAction);
		emitter.addListener('authorisation.crash', this.authCrashAction);
		emitter.addListener('authorisation.logout', this.logoutAction);
		emitter.addListener('authorisation.load.failed', this.loadFailedAction);
	},
	/**
	 * Пользователь залигинился
	 * @param  {Object} req
	 * @param  {Object} res
	 * @param  {Object} user
	 * @return {void}
	 */
	userLogginedAction: function(req, res, user) {
		res.send({
			res: true
		});
		logged('user.loggined');
	},

	authFailedAction: function(req, res) {
		res.send({
			res: false,
			mess: res.app.get("locale").line("error_auth_failed")
		});
		logged('authorisation.failed');
	},

	authCrashAction: function(req, res, err) {
		res.send({
			res: false,
			mess: err
		});
		logged('authorisation.crashed');
	},

	logoutAction: function(req, res) {
        res.redirect("/");
	},

	loadFailedAction: function(req, res){
		res.send({
			res: false,
			mess: ""
		});
	}

});

exports.listen = function(emitter) {
	//var emitter = new eventEmitter();
	var listener = new AuthListener();
	listener.init(emitter);
	return listener;
}