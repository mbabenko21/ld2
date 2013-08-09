/**
 * Create from Sublime Text 3
 * @author Maksim Babenko <mbabenko21@gmail.com>
 * File: auth_listener.js
 * @package /lib/ld2/events
 */

var Backbone = require("backbone"),
	AuthListener, eventEmitter = require('events').EventEmitter,
	logger = require("../logger").Logger();

function logged(event) {
	logger.info("Emit event: \x1b[32m\x1b[1m"+event);
}

AuthListener = Backbone.Model.extend({
	/**
	 * Инициализация всех слушателей
	 * @param  {EventEmitter} emitter
	 * @return {void}
	 */
	init: function(emitter) {
		emitter.on('user_loggined', this.userLogginedAction);
		emitter.addListener('authorisation_failed', this.authFailedAction)
	},

	userLogginedAction: function(User) {
		logged('user_loggined');
	},

	authFailedAction: function(){
		logged('authorisation_failed');
	}

});

exports.listen = function(emitter) {
	//var emitter = new eventEmitter();
	var listener = new AuthListener();
	listener.init(emitter);
	return listener;
}