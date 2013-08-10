/**
 * Created at Sublime Text 3
 * @author Maks Babenko <mbabenko21@gmail.com>
 * File: auth_service.js
 * @package /lib/ld2/services
 *
 * Модель авторизации
 * @method login(req, res)
 * @method logout(req, res)
 * @method currentAccount(req, res)
 * @method isLogin(req, res)
 *
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
	login: function(req, res) {
		var auth = req.body.auth;
		User.findOne({email: auth.email}, function(err, d) {
			if (err) eventEmitter.emit('authorisation.failed', req, res);
			if (d && d.autentificate(auth.password)) {
				var token = d.createToken();
				res.cookie(
					res.app.get("config").getConfig("app_name"),
					token, {
						expires: new Date(Date.now() + 2 * 3600 * 24 * 365),
						path: '/'
					}
				);
				d.token = token;
				d.save();
				req.account = d;
				/*d.update({
					email: d.email
				}, {$set: {token: token}}, function(err) {
					eventEmitter.emit('authorisation.crash', req, res, err);
				});
				*/
				eventEmitter.emit('authorisation.login', req, res, d);
			} else {
				eventEmitter.emit('authorisation.failed', req, res);
			}
		});
	},
	/**
	 * Установка кук, выбрасывание события
	 * @param  {User} user
	 * @return {void}
	 */
	_loginProcess: function(user) {
		eventEmitter.emit('user.loggined', user);
	},
	/**
	 * Разлогивание
	 * @return {void}
	 */
	logout: function(req, res) {
		//обновление в базе
		User.findOne({
			token: req.cookies[res.app.get("config").getConfig("app_name")]
		}, function(err, d) {
			if (d) {
				d.token = "";
				req.account = ""
				d.save();
			}
		});
		//удаление кук
		res.cookie(
			res.app.get("config").getConfig("app_name"),
			"", {
				expires: new Date(Date.now() - 3 * 3600 * 24 * 365),
				path: '/'
			}
		);
		eventEmitter.emit('authorisation.logout', req, res);
	},

	/**
	 * Проверка статуса авторизации
	 * @return {bool}
	 */
	isLogin: function(req, res) {
		return req.cookies[res.app.get("config").getConfig("app_name")] !== undefined;
	},
	/**
	 * Получение залогиненого пользоватедя
	 * @return {User}
	 */
	loadAccount: function(req, res, next) {
		if(req.cookies[res.app.get("config").getConfig("app_name")] !== undefined){
			var token = req.cookies[res.app.get("config").getConfig("app_name")];			
			User.findOne({token: token}, function(err, d){
				if(d){
					req.account = d;
        			next();
				} else {
					next();
				}
				if(err){
					console.log(err);
					next();
					eventEmitter.emit('authorisation.load.failed', req, res);
				}
			});
		} else{
			next();
		}
		//return account;
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