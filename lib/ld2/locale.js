/**
 *
 */

var yaml = require('js-yaml')
    , fs = require("fs")
    , util = require("util")
    , path = __dirname + "/../../resources/locale"
    , Backbone = require("backbone");

var Locale = Backbone.Model.extend({

    loadTranslations: function (locale) {
        path = path + "/" + locale + ".yml";
        fs.exists(path, function (exists) {
            if (!exists) {
                throw new Error("Locale " + locale + " file not exists");
            }
        });
        this.translations = require(path);
    },
    /**
     *
     * @param line
     * @returns string
     */
    line: function (line) {
        var returned;
        if (this.translations[line] !== undefined) {
            returned = this.translations[line]
        } else {
            returned = "" + line.toString();
        }
        return returned;
    }
});

exports.Translations = function (locale) {
    var lc = new Locale;
    lc.loadTranslations("ru-RU");
    return lc;
}
