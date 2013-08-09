/**
 * Create from Sublime Text 3
 * @author Maksim Babenko <mbabenko21@gmail.com>
 * File: registration_service.js
 * @package /lib/ld2/services
 */

var Backbone = require("backbone"),
	RegistrationModel, User = require("../models/user").User(),
	listener = require("../events/registration_listener"),
	emitter = require('events').EventEmitter,
	eventEmitter = new emitter();

RegistrationModel = Backbone.Model.extend({
	/**
	 * Регистрация аккаунта
	 * @param  {string} email
	 * @param  {string} password
	 * @param  {string} password_confirm
	 * @return {void}
	 */
	regAccount: function(email, password, password_confirm) {
		eventEmitter.emit('registration.account');
	}
});

exports.Registration = function() {
	listener.listen(eventEmitter);
	var reg = new RegistrationModel();
	return reg;
}