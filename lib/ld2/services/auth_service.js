/**
 * Created at Sublime Text 3
 * @author Maks Babenko <mbabenko21@gmail.com>
 * File: auth_service.js
 * @package /lib/ld2/services
 *
 * Модель авторизации
 */

var Backbone = require("backbone"),
	emitter = require('events').EventEmitter,
	listener = require("../events/auth_listener"),
	User = require("../models/user").User(),
	eventEmitter = new emitter();
var AuthModel = Backbone.Model.extend({
	/**
	 * Логин
	 * @param  {string} email
	 * @param  {string} password
	 * @return {void}
	 */
	login: function(email, password) {
		User.findOne({email: email}, function(err, d){
			if(err) handleError(err);
			if(d && d.password == User.encryptPassword(password)){
				this._loginProcess(d);
			} else {
				eventEmitter.emit('authorisation_failed');
			}
		});
	},
	/**
	 * Установка кук, выбрасывание события
	 * @param  {User} user
	 * @return {void}
	 */
	_loginProcess: function(user){
		eventEmitter.emit('user_loggined', user);
	},
	/**
	 * Разлогивание
	 * @return {void}
	 */
	logout: function() {

	},
	/**
	 * Получение залогиненого пользоватедя
	 * @return {User}
	 */
	currentAccount: function() {

	},
	/**
	 * Проверка статуса авторизации
	 * @return {bool}
	 */
	isLogin: function() {

	}
});
/**
 * Запуск сервиса авторизации
 * навишивается слушатель auth_listener 
 * @return {AuthModel}
 */
exports.Auth = function() {
	listener.listen(eventEmitter);
	var auth = new AuthModel({
		emitter: eventEmitter
	});
	return auth;
}