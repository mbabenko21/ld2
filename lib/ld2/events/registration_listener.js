/**
 * Create from Sublime Text 3
 * @author Maksim Babenko <mbabenko21@gmail.com>
 * File: registration_listener.js
 * @package /lib/ld2/events
 */

var Backbone = require("backbone"),
	RegListener,
	logger = require("../logger").Logger()
	user = require("../models/user").User();

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
		emitter.addListener('registration.account.failed', this.regAccountFailed);
		emitter.addListener('registration.account.success', this.regAccountSuccess);
	},

	regAccountFailed: function(req, res, error_message) {
		res.send({
			res: false,
			mess: res.app.get("locale").line(error_message)
		});
		logged(res.app.get("locale").line(error_message));
	},

	regAccountSuccess: function(req, res) {
		res.send({res: true});
	}
});
/**
 * Подключение листенеров
 * @param  {EventEmitter} emitter
 * @return {void}
 */
exports.listen = function(emitter) {
	var listener = new RegListener();
	listener.init(emitter);
	return listener;
}