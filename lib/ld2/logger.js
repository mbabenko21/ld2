/**
* Create from Sublime Text 3
* @author Maksim Babenko <mbabenko21@gmail.com>
* File: logger.js
* @package /lib/ld2
*/
var Backbone = require("backbone"), LoggerModel;

LoggerModel = Backbone.Model.extend({
	debug_mode: true,
	info: function(message){
		this._log("\x1b[34m"+message);
	},

	warning: function(message){
		this._log("\x1b[33m"+message);
	},

	debug: function(message){
		this._log("\x1b[32m"+message);
	},

	_log: function(mes){
		if(this.debug_mode == true){
			console.log(mes+"\x1b[0m");
		}
	}
});

exports.Logger = function(debug_mode){
	debug_mode = debug_mode || true;
	var logger = new LoggerModel({debug_mode: debug_mode});
	return logger;
}