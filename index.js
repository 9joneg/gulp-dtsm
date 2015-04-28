"use strict";

var through = require("through2");
var gutil = require("gulp-util");
var PluginError = gutil.PluginError;

require("es6-promise").polyfill();
var dtsm = require("dtsm");

var PLUGIN_NAME = "gulp-dtsm";

module.exports = function () {
    return through.obj(function(file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
        }
        if (file.isStream()) {
            cb(new PluginError(PLUGIN_NAME, "Streaming not supported"));
        }

        dtsm
            .createManager({
                configPath: file.relative
            })
            .then(function (manager) {
                return manager.installFromFile();
            })
            .then(function (result) {
                gutil.log(result.dependenciesList.length + " files created.");
                result.dependenciesList.forEach(function (dep) {
                    gutil.log(dep.depName);
                });
                cb(null, file);
            }, function (error) {
                cb(new PluginError(PLUGIN_NAME, error));
            });
    });
};
