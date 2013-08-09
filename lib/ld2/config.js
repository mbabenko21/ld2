var Backbone = require('backbone')
, yaml = require("js-yaml")
, fs = require('fs')
, ConfigModel;

ConfigModel = Backbone.Model.extend({
	config: {},

	loadFile: function(file){
		var path = file;
		fs.exists(path, function(exists){
			if(!exists)
				throw new Error("Config file "+path+" not exists");
		});
		this.config = require(path);
	},

	getConfig: function(line){
		return (this.config[line] != "undefined") ? this.config[line] : null;
	},

	getLocale: function(){
		return this.getConfig("locale");
	}
});

exports.Config = function(config_path){
	var conf = new ConfigModel;
	conf.loadFile(config_path);
	return conf;
};