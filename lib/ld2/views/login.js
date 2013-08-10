var AuthWidgetController, AuthFormWidget, AuthFormController;
AuthWidgetController = Backbone.Router.extend({
	routes: {
		"!/": "loginAction", // Пустой hash-тэг
		"!/auth": "loginAction", // Начальная страница 
		"!/registration": "registrationAction",
		"!/reg-success": "regSuccessAction",
		"!/logout": "logoutAction"
	},

	loginAction: function() {
		function navigate(path) {
			this.AuthFormController.navigate(path);
		}
		$.post("/login.json", {
			auth: {
				email: $("input#inputSuccess").val(),
				password: $("input#passwordSuccess").val()
			}
		}, function(response) {
			console.log(response);
			switch (response.res) {
				case false:
					var html = '<div class="alert alert-error">';
					html += '<button class="close" data-dismiss="alert">&times;</button>';
					html += response.mess;
					html += "</div>";
					$("div#widget-errors").html(html);
					navigate("");
					break;
				case true:
					document.location.href = "/cabinet.html";
				break;
				default:
					navigate("");
			}
		});
	},

	registrationAction: function() {
		var email, password, confirmation;
		email = $("input#reg-email").val();
		password = $("input#reg-password").val();
		confirmation = $("input#reg-password-confirm").val();

		function navigate(path) {
			this.AuthFormController.navigate(path);
		}
		$.post("/registration.json", {
			reg: {
				email: email,
				password: password,
				confirmation: confirmation
			}
		}, function(response) {
			switch (response.res) {
				case true:
					navigate("!/reg-success");
					break;
				case false:
					var html = '<div class="alert alert-error">';
					html += '<button class="close" data-dismiss="alert">&times;</button>';
					html += response.mess;
					html += "</div>";
					$("div#widget-errors").html(html);
					navigate("");
					break;
				default:
					navigate("");
			}
		});
	},

	logoutAction: function() {
		function navigate(path) {
			this.AuthFormController.navigate(path);
		}
		$.post("/logout", function(response){
			switch(response.res){
				case true:
				navigate("");
				break;
				default:
					navigate("");
			}
		});
	},

	regSuccessAction: function() {
		//TODO: здесь надо залогинить пользователя и перенаправить в кабинет
		document.location.href = "/cabinet.html";
	}
});

AuthFormController = new AuthWidgetController();
Backbone.history.start();

AuthFormWidget = Backbone.View.extend({
	el: $("div#auth-form-widget"),
	events: {
		"click button:button#button-login": "loginAction",
		"click button:button#button-registration": "registrationAction"
	},

	loginAction: function() {
		AuthFormController.navigate("!/auth", true);
	},

	registrationAction: function() {
		AuthFormController.navigate("!/registration", true);
	}
});

$(document).ready(function() {
	var auth_form_widget = new AuthFormWidget();
});