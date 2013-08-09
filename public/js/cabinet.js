/**
 * Created with JetBrains PhpStorm.
 * User: maksim
 * Date: 07.08.13
 * Time: 18:35
 * To change this template use File | Settings | File Templates.
 */

var menu_buttons = {
    cabinet_button: {
        id: "button-cabinet",
        label: "button_cabinet",
        class: "btn btn-inverse",
        type: "button",
        options: {
            icons: {secondary: "ui-icon-person"}
        }
    },
    char_create_button: {
        id: "char-create-button",
        label: "button_char_create",
        class: "btn btn-inverse",
        type: "button",
        options: {
            icons: {
                secondary: "ui-icon-circle-plus"
            }
        }
    },
    account_settings: {
        id: "button-account-settings",
        label: "button_settings",
        class: "btn btn-inverse",
        type: "button",
        options: {
            icons: {
                secondary: "ui-icon-gear"
            }
        }
    },

    power_button: {
        id: "button-logout",
        label: "button_logout",
        class: "btn btn-inverse",
        type: "button",
        options: {
            icons: {
                secondary: "ui-icon-power"
            }
        }
    }
};

var CabinetMenuWidget = Backbone.View.extend({
    el: $("div#cabinet-menu"),
    translations: {},

    events: {
        "click button#button-cabinet": "cabinet",
        "click button#char-create-button": "charCreate",
        "click button#button-account-settings": "accountSettings",
        "click button#button-logout": "logout"
    },

    render: function () {
        _.forEach(menu_buttons, this.createButton, this);
    },

    cabinet: function () {
        console.log("my cabinet");
    },

    charCreate: function () {
        console.log("char creator");
    },

    accountSettings: function () {
        console.log("account settings");
    },

    logout: function () {
        $.ajax({
            url: "/logout"
        });
        console.log("logout...");
        document.location.href = "/login";
    },

    createButton: function (object) {
        //console.log(translations[object.label]);
        var button = $('<button id="' + object.id + '" class="' + object.class + '" type="' + object.type + '">' + translations[object.label] + '</button>');
        button.appendTo(this.el);
        $("button#" + object.id).button(object.options);
    }


});

$(function () {
    var cabinet_menu_widget = new CabinetMenuWidget();
    cabinet_menu_widget.render();
});
