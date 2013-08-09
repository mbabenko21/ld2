/**
 * Create from Sublime Text 3
 * @author Maksim Babenko <mbabenko21@gmail.com>
 * File: user.js
 * @package /lib/ld2/models
 *
 * Модель пользователя
 */

var crypto = require('crypto'),
	mongoose = require("mongoose"),
	validator = require("mongoose-validate");


var UserSchema = new mongoose.Schema({
	email: {
		type: "String",
		required: true,
		validate: [validator.email, "error_email_incorrect"]
	},
	_password: "String",
	hashed_password: "String",
	sex: "String",
	created_at: {
		type: "Date",
		default: Date.now
	}
});

UserSchema.methods.encryptPassword = function(password) {
	return crypto.createHmac('sha1', this.salt).
	update(password).
	digest('hex');
};

UserSchema.methods.makeSalt = function() {
	return Math.round((new Date().valueOf() * Math.random())) + '';
};

UserSchema.methods.authenticate = function(plainText) {
	return this.encryptPassword(plainText) === this.hashed_password;
};

/*UserSchema.methods.save = function(successFunction, failedFunction) {
    if (this.isValid()) {
        this.__super__(successFunction);
    } else {
        failedFunction();
    }
};*/

UserSchema.virtual("password").set(function(password) {
	this._password = password;
	this.salt = this.makeSalt();
	this.hashed_password = this.encryptPassword(password);
});

UserSchema.index({
	email: 1
}, {
	unique: true
});


mongoose.model('User', UserSchema);

exports.User = function() {
	return mongoose.model('User');
};