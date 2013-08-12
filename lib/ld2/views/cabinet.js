/**
 * Create from Sublime Text 3
 * @author Maksim Babenko <mbabenko21@gmail.com>
 * File: cabinet.js
 * @package
 */

var CabinetController, CabinetView;

CabinetController = Backbone.Router.extend({
    showAlert: function (el, message, type) {
        type = type || 'error';
        message = message || 'message';
        var html = '<div id="alert-message" class="alert alert-' + type + ' fade in">';
        html += '<button class="close" data-dismiss="alert">&times;</button>';
        html += message;
        html += "</div>";
        if(typeof el.html == "function"){
            var element = el;
        } else {
            var element = $(el);
        }
        element.html(html);
    }
});
var Controller = new CabinetController();
Backbone.history.start();


var CabinetMenuView = Backbone.View.extend({
    el: "div#cabinet-menu",
    events: {
        "click a[href='#settings']": "settingsAction",
        "click a[href='#cabinet']": "cabinetAction",
        "shown.bs.tab a[data-toggle='tab']": "changeTitle"
    },

    settingsAction: function (e) {
        $("a[href='#settings']").tab('show');
    },

    cabinetAction: function (e) {
        $("a[href='#cabinet']").tab('show');
    },

    changeTitle: function (e) {
        $(".panel-title").html(e.currentTarget.innerHTML);
    }
});


var SettingsView = Backbone.View.extend({
    el: "div#settings",

    events: {
        "click button:button#button-save-base-info": "saveInfo",
        "click button:button#button-change-email": "changeEmail",
        "click button:button#button-change-password": "changePassword",
        "focus input:input#input-new-email": "validateEmail",
        "focus input:input#input-password__1": "validateEmail",
        "focus input:input#input-password__4": "validateChangePassword",
        "focus input:input#input-password__3": "validateChangePassword"
    },

    saveInfo: function () {
        var firstName = $("input#input-first-name").val()
            , lastName = $("input#input-last-name").val();
        $.post('/save-info.json', {
            info: {
                first_name: firstName,
                last_name: lastName
            }
        }, function (response) {
            if (response.res !== undefined) {
                switch (response.res) {
                    case true:
                        $("#account-name").html(firstName+" "+lastName+" <span class='caret'></span>");
                        $("input#input-first-name").attr("placeholder", firstName);
                        $("input#input-last-name").attr("placeholder", lastName);
                        $("input#input-last-name").val("");
                        $("input#input-first-name").val("");
                        break;
                    case false:
                        Controller.showAlert($("div#errors-base-parameters"), response.mess, "error");
                        break;
                }
            } else {
                Controller.showAlert($("div#errors-base-parameters"), "No connection", "error");
            }
        });
    },

    changeEmail: function () {
        var email = $("input#input-new-email").val(),
            password = $("input#input-password__1").val();

        $.post("/change-email.json", {
            data: {
                email: email,
                password: password
            }
        }, function(response){
            if(response.res !== undefined){
                //console.log(response.mess);
                switch(response.res){
                    case true:
                        $("#label-current-email").html(response.mess);
                        break;
                    case false:
                        Controller.showAlert($("div#errors-change-email"), response.mess, "error");
                        break;
                }
                $("input#input-new-email").val("");
                $("input#input-password__1").val("");
                $("div#new-email").removeClass("has-warning");
                $("div#new-email").removeClass("has-success");
                $("button#button-change-email").attr("disabled", true);
            } else {
                Controller.showAlert($("div#errors-change-email"), "No connection", "error");
            }
        });
    },

    changePassword: function () {
        var password = $("input#input-password__2")
            , passwordContainer = $("div#input-password__2_label")
            , newPassword = $("input#input-password__3")
            , newPasswordContainer = $("input#input-password__3_label")
            , confirm = $("input#input-password__4")
            , confirmContainer = $("input#input-password__4_label")
            , button = $("button#button-change-password")
            , popover = $("[rel=popover]");
        $.post("/change-password.json", {
            data: {
                password: password.val(),
                new_password: newPassword.val(),
                confirm: confirm.val()
            }
        }, function(response){
            if(response.res !== undefined){
                switch(response.res){
                    case true:
                        Controller.showAlert($("div#errors-change-password"), response.mess, "info");
                        break;
                    case false:
                        Controller.showAlert($("div#errors-change-password"), response.mess, "error");
                        break;
                }
                popover.popover('destroy');
                password.val("");
                newPassword.val("");
                confirm.val("");
                newPasswordContainer.removeClass("has-success").removeClass("has-warning");
                confirmContainer.removeClass("has-success").removeClass("has-warning");
                button.attr("disabled", true);
            } else {
                Controller.showAlert($("div#errors-change-password"), "No connection", "error");
            }
        });
    },


    validateEmail: function (event) {
        var chEml = function (event) {
            var email = $("input#input-new-email").val();
            var validation = email.match(/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/);
            if (validation === null) {
                $("div#new-email").removeClass("has-success");
                $("div#new-email").addClass("has-warning");
                $("#label-new-email").addClass("text-warning");
                $("div#new-email").tooltip({
                    placement: 'right'
                });
                $("button#button-change-email").attr("disabled", true);
            } else {
                $("div#new-email").addClass("has-success");
                $("#label-new-email").removeClass("text-warning");
                $("div#new-email").tooltip('destroy');
                $("button#button-change-email").removeAttr("disabled");
            }
        };
        $("input#input-new-email").bind("textchange", chEml);
    },


    validateChangePassword: function (event) {
        var password, confirm
            , pwd = $("input#input-password__3")
            , pwdContainer = $("#input-password__3_container")
            , pwdLabel = $("#input-password__3_label")
            , cnf = $("input#input-password__4")
            , cnfContainer = $("#input-password__4_container")
            , cnfLabel = $("#input-password__4_label")
            , button = $("#button-change-password");
        var chPwd = function (event) {
            password = pwd.val();
            confirm = cnf.val();
            if (password == confirm && password != "" && confirm != "") {
                pwdContainer.removeClass("has-warning").addClass("has-success");
                cnfContainer.removeClass("has-warning").addClass("has-success");
                pwdLabel.removeClass("text-warning");
                cnfLabel.removeClass("text-warning");
                button.removeAttr("disabled");
            } else if(password != confirm && password != "" && confirm != "") {
                pwdContainer.removeClass("has-success").addClass("has-warning");
                cnfContainer.removeClass("has-success").addClass("has-warning");
                pwdLabel.addClass("text-warning");
                cnfLabel.addClass("text-warning");
                button.attr("disabled", true);
            } else if(password == "" && confirm == ''){
                pwdContainer.removeClass("has-warning").removeClass("has-success");
                cnfContainer.removeClass("has-warning").removeClass("has-success");
                pwdLabel.removeClass("text-warning");
                cnfLabel.removeClass("text-warning");
                button.removeAttr("disabled");
            }
        };
        pwd.bind('textchange', chPwd).bind('notext', chPwd);
        cnf.bind('textchange', chPwd).bind('notext', chPwd);
    }
});


$(function () {
    $('body').popover({
        html: true,
        selector: '[rel=popover]',
        placement: 'right'
    });

});

$(document).ready(function () {
    var cabinet_menu_view = new CabinetMenuView();
    var settings = new SettingsView();
});