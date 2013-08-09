/**
 * Create from Sublime Text 3
 * @author Maksim Babenko <mbabenko21@gmail.com>
 * File: registration_listener.js
 * @package /lib/ld2/events
 */

var Backbone = require("backbone"),
	RegListener,
	logger = require("../logger").Logger();

function logged(event) {
	logger.info("Emit event: \x1b[32m\x1b[1m" + event);
}

RegListener = Backbone.Model.extend({
	/**
	 * Добавлние всех слушателей
	 * @param  {EventEmitter} emitter
	 * @return {void}
	 */
	init: function(emitter) {
		emitter.addListener('registration.account', this.regAccount);
	},

	regAccount: function(Account){
		logged('registration.account');
	}
});
/**
 * Подключение листенеров
 * @param  {EventEmitter} emitter
 * @return {void}
 */
exports.listen = function(emitter){
	var listener = new RegListener();
	listener.init(emitter);
	return listener;
}