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
    validator = require("mongoose-validate")
    , Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: {
        type: "String",
        validate: [validator.email, "error_email_incorrect"]
    },
    _password: "String",
    hashed_password: "String",
    salt: "String",
    sex: "String",
    token: "String",
    created_at: {
        type: "Date",
        default: Date.now
    },
    _settings: {
        first_name: String,
        last_name: String
    }
});


UserSchema.virtual("password").set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
}).get(function () {
        return this._password;
    });


UserSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

UserSchema.virtual('fullName')
    .get(function () {
        return this._settings.first_name + " " + this._settings.last_name;
    });

UserSchema.virtual("firstName").set(function (fName) {
    this._settings.first_name = fName;
}).get(function () {
        return this._settings.first_name;
    });

UserSchema.virtual("lastName").set(function (lName) {
    this._settings.last_name = lName;
}).get(function () {
        return this._settings.last_name;
    });

UserSchema.method('encryptPassword', function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
});

UserSchema.method("createToken", function () {
    var token = this.email + this.password + this.makeSalt();
    this.token = this.encryptPassword(token);
    return this.token;
});

UserSchema.method('makeSalt', function () {
    return Math.round((new Date().valueOf() * Math.random())) + '';
});

UserSchema.method('autentificate', function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
});
UserSchema.method('_safeEmail', function(email){
    var firstChart = email.charAt(0);
    var arr = email.split("@");
    return firstChart+"***@"+arr[1];
});

UserSchema.method('getEmail', function(safe){
    safe = safe || true;
    if(safe == true){
        return this._safeEmail(this.email);
    } else {
        return this.email;
    }
});

/*UserSchema.methods.save = function(successFunction, failedFunction) {
 if (this.isValid()) {
 this.__super__(successFunction);
 } else {
 failedFunction();
 }
 };*/

UserSchema.index({
    email: 1
}, {
    unique: true
});


mongoose.model('User', UserSchema);

exports.User = function () {
    return mongoose.model('User');
};