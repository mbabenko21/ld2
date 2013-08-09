var AuthWidgetController, AuthFormWidget, AuthFormController;
AuthWidgetController = Backbone.Router.extend({
	routes: {
		"": "loginAction", // Пустой hash-тэг
		"!/auth": "loginAction", // Начальная страница 
		"!/registration": "registrationAction"
	},

	loginAction: function() {
		$.post("/login.json", {
			auth: {
				email: $("input#inputSuccess").val(),
				password: $("input#passwordSuccess").val()
			}
		}, function(response) {
			//$('span#auth-result').html(data);
			console.log(response);
		});
	},

	registrationAction: function() {
		$.post("/registration.json", {
			reg: {
				email: $("input[name='reg[email]']").val(),
				password: $("input[name='reg[password]']").val(),
				password_confirm: $("input[name='reg[password_confirm]']").val(),
			}
		}, function(response) {
			console.log(response);
		});
	}
});

AuthFormContrller = new AuthWidgetController();
Backbone.history.start();

AuthFormWidget = Backbone.View.extend({
	el: $("div#auth-form-widget"),
	events: {
		"click button:button#button-login": "loginAction",
		"click button:button#button-registration": "registrationAction"
	},


	loginAction: function() {
		AuthFormContrller.navigate("!/auth", true);
	},

	registrationAction: function() {
		AuthFormContrller.navigate("!/registration", true);
	}
});


var auth_form_widget = new AuthFormWidget();