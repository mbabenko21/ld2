/**
 * Created with JetBrains PhpStorm.
 * User: maksim
 * Date: 12.08.13
 * Time: 12:05
 * To change this template use File | Settings | File Templates.
 */

var Backbone = require("backbone"),
    CabinetListener, eventEmitter = require('events').EventEmitter,
    logger = require("../logger").Logger({debug_mode: true});
function logged(event) {
    logger.info("Emit event: \x1b[32m\x1b[1m" + event);
}

CabinetListener = Backbone.Model.extend({
    init: function(emitter){
        emitter.addListener('cabinet.settings.save.success',    this.infoSaved);
        emitter.addListener('cabinet.settings.save.fail',       this.infoSavedFail);
        emitter.addListener('cabinet.nonauth',                 this.redirectIfNonAuth);
    },

    redirectIfNonAuth: function(req, res){
        res.redirect("/");
    },

    infoSaved: function(req, res, mess){
        res.send({
            res: true,
            mess: mess
        });
    },

    infoSavedFail: function(req, res, err){
        res.send({
            res: false,
            mess: err
        })
    }
});

exports.listen = function(emitter) {
    //var emitter = new eventEmitter();
    var listener = new CabinetListener();
    listener.init(emitter);
    return listener;
};