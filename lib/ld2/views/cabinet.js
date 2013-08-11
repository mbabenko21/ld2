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

    cabinetAction: function () {
        console.log("tset");
    },

    registrationAction: function () {
        AuthFormController.navigate("!/registration", true);
    }
});


var SettingsView = Backbone.View.extend({
    el: "div#settings",

    events: {
        "click button:button#button-save-base-info":    "saveInfo",
        "click button:button#button-change-email":      "changeEmail",
        "click button:button#button-change-password":   "changePassword",
        "focus input:input#input-new-email":            "validateEmail",
        "focus input:input#input-password__1":          "validateEmail",
        "focus input:input#input-password__4":          "validateChangePassword",
        "focus input:input#input-password__3":          "validateChangePassword"
    },

    saveInfo: function () {

    },

    changeEmail: function () {

    },

    changePassword: function () {

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
        var chPwd = function (event) {
            var password, confirm
                , pwd = $("input#input-password__3")
                , cnf = $("input#input-password__4");
            password = pwd.val();
            confirm = cnf.val();
            if (password == confirm && password != "" && confirm != "") {
                $("#input-password__3_container").removeClass("has-warning");
                $("#input-password__4_container").removeClass("has-warning");
                $("#input-password__3_container").addClass("has-success");
                $("#input-password__4_container").addClass("has-success");
                $("#input-password__3_label").removeClass("text-warning");
                $("#input-password__4_label").removeClass("text-warning");
                $("#button-change-password").removeAttr("disabled");
            } else {
                $("#input-password__3_container").removeClass("has-success");
                $("#input-password__4_container").removeClass("has-success");
                $("#input-password__3_container").addClass("has-warning");
                $("#input-password__4_container").addClass("has-warning");
                $("#input-password__3_label").addClass("text-warning");
                $("#input-password__4_label").addClass("text-warning");
                $("#button-change-password").attr("disabled", true);
            }
        };
        $("input#input-password__3").bind('textchange', chPwd);
        $("input#input-password__4").bind('textchange', chPwd);
    }
});

$(function () {
    var cabinet_menu_view = new CabinetMenuView();
    //$('#input-first-name').tooltip({});
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