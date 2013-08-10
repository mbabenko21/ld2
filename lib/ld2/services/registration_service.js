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
	 * @param  {object} req Request
	 * @param  {object} res Response
	 * @return {object}
	 */
	regAccount: function(req, res) {
		var reg = req.body.reg,
			response;


		if (reg.password != "") {
			if (reg.password == reg.confirmation) {
				User.findOne({
					email: reg.email
				}, function(err, d) {
					if (!d) {
						//Создание пользователя
						user = new User();
						user.email = reg.email;
						user.password = reg.password;
						user.save(function(err) {
							if (err) {
								eventEmitter.emit('registration.account.failed', req, res, err.errors.email.type);
							} else {
								eventEmitter.emit('registration.account.success', req, res);
							}
						});
					} else {
						eventEmitter.emit('registration.account.failed', req, res, 'error_email_exists');
					}
				});
			} else {
				eventEmitter.emit('registration.account.failed', req, res, 'error_password_not_confirm');
			}
		} else {
			eventEmitter.emit('registration.account.failed', req, res, 'error_password_not_blank');
		}
	}
});

exports.Registration = function() {
	listener.listen(eventEmitter);
	var reg = new RegistrationModel();
	return reg;
}