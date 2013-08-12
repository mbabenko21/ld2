/**
 * Create from Sublime Text 3
 * @author Maksim Babenko <mbabenko21@gmail.com>
 * File: cabinet_controller.js
 * @package /lib/ld2/controllers
 */

var Backbone = require("backbone"),
    emitter = require('events').EventEmitter,
    listener = require("../events/cabinet_listener"),
    user = require("../models/user").User(),
    eventEmitter = new emitter(),
    CabinetControllerModel;

CabinetControllerModel = Backbone.Model.extend({
    indexAction: function (req, res) {
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
    },

    saveInfoAction: function (req, res) {
        if (req.account !== undefined) {
            if (req.body.info.first_name != "" && req.body.info.last_name != "") {
                req.account.firstName = req.body.info.first_name;
                req.account.lastName = req.body.info.last_name;
                req.account.save(function (err) {
                    if (err) {
                        eventEmitter.emit("cabinet.settings.save.fail", req, res, err);
                    } else {
                        eventEmitter.emit("cabinet.settings.save.success", req, res);
                    }
                });
            } else {
                eventEmitter.emit("cabinet.settings.save.fail", req, res, res.app.get("locale").line("error_name_not_be_empty"));
            }
        } else {
            eventEmitter.emit("cabinet.nonauth", req, res);
        }
    },

    changeEmailAction: function (req, res) {
        var data = req.body.data;
        if (req.account !== undefined) {
            if (req.account.autentificate(data.password)) {
                user.findOne({email: data.email}, function (err, d) {
                    if (err) {
                        eventEmitter.emit("cabinet.settings.save.fail", req, res, err);
                    } else if (d) {
                        eventEmitter.emit("cabinet.settings.save.fail", req, res, res.app.get("locale").line("error_email_exists"));
                    } else {
                        var acc = req.account;
                        acc.email = data.email;
                        acc.save(function (err) {
                            if (err) {
                                eventEmitter.emit("cabinet.settings.save.fail", req, res, err);
                            } else {
                                eventEmitter.emit("cabinet.settings.save.success", req, res, acc.getEmail());
                            }
                        });
                    }
                });
            } else {
                eventEmitter.emit("cabinet.settings.save.fail", req, res, res.app.get("locale").line("error_password_invalid"));
            }
        } else {
            eventEmitter.emit("cabinet.nonauth", req, res);
        }
    },

    changePasswordAction: function (req, res) {
        var data = req.body.data;
        if (req.account !== undefined) {
            var account = req.account;
            if (account.autentificate(data.password)) {
                if (data.new_password == data.confirm) {
                    account.password = data.new_password;
                    account.save(function (err) {
                        if (err) {
                            eventEmitter.emit("cabinet.settings.save.fail", req, res, err);
                        } else {
                            eventEmitter.emit("cabinet.settings.save.success", req, res, res.app.get("locale").line("info_password_has_been_changed"));
                        }
                    });
                } else {
                    eventEmitter.emit("cabinet.settings.save.fail", req, res, res.app.get("locale").line("error_password_not_confirm"));
                }
            } else {
                eventEmitter.emit("cabinet.settings.save.fail", req, res, res.app.get("locale").line("error_password_invalid"));
            }
        } else {
            eventEmitter.emit("cabinet.nonauth", req, res);
        }
    }
});

exports.CabinetController = function () {
    listener.listen(eventEmitter);
    return new CabinetControllerModel();
};