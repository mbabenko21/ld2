/**
 * Create from Sublime Text 3
 * @author Maksim Babenko <mbabenko21@gmail.com>
 * File: cabinet_controller.js
 * @package /lib/ld2/controllers
 */

var Backbone = require("backbone"),
	CabinetControllerModel;

CabinetControllerModel = Backbone.Model.extend({
	indexAction: function(req, res) {
		if (req.account !== undefined) {
			res.render("cabinet/index.jade", {
				locale: res.app.get("locale"),
                account: req.account
			});
		} else {
			res.writeHead(302, {
				'Location': '/login.html'
				//add other headers here...
			});
			res.end();
		}
	}
});

exports.CabinetController = function() {
	return new CabinetControllerModel();
}