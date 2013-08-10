/**
 * Create from Sublime Text 3
 * @author Maksim Babenko <mbabenko21@gmail.com>
 * File: cabinet.js
 * @package
 */

var CabinetController, CabinetView;

CabinetController = Backbone.Router.extend({

});
var Controller = new CabinetController();
Backbone.history.start();


var CabinetMenuView = Backbone.View.extend({
	el: $("div#cabinet-menu"),
	events: {
		"click :a#button-cabinet": "cabinetAction",
		"click :a#button-registration": "registrationAction"
	},

	loginAction: function() {
		console.log("tset");
	},

	registrationAction: function() {
		AuthFormController.navigate("!/registration", true);
	}
});
$(document).ready(function() {
	var cabinet_menu_view = new CabinetMenuView();
	cabinet_menu_view.delegateEvents({
		"click :a#button-cabinet": "cabinetAction",
		"click :a#button-registration": "registrationAction"
	});
});