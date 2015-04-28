"use strict";

var assert = require("assert");
var File = require("gulp-util").File;
var fs = require("fs");
var path = require("path");
var dtsm = require("../");

describe("gulp-dtsm", function() {
    this.timeout(30000);

    var stream;

    beforeEach(function() {
        stream = dtsm();
    });

    it("can install the definition", function(done) {
        var file = new File({
            path: path.join(__dirname, "/fixtures/jquery-dtsm.json"),
            contents: new Buffer("")
        });

        var base = path.join(__dirname, "fixtures/tmp/jquery-dtsm/typings");
        var target = path.join(base, "/jquery/jquery.d.ts");

        stream.on("data", function() {
        });

        stream.on("error", done);

        stream.on("end", function() {
            assert.strictEqual(fs.existsSync(target), true);
            done();
        });

        stream.write(file);
        stream.end();
    });

    it("can install the definitions", function(done) {
        var file = new File({
            path: path.join(__dirname, "/fixtures/atom-dtsm.json"),
            contents: new Buffer("")
        });

        var base = path.join(__dirname, "fixtures/tmp/atom-dtsm/typings/");
        var targets = [
            path.join(base, "atom/atom.d.ts"),
            path.join(base, "emissary/emissary.d.ts"),
            path.join(base, "jquery/jquery.d.ts"),
            path.join(base, "mixto/mixto.d.ts"),
            path.join(base, "node/node.d.ts"),
            path.join(base, "pathwatcher/pathwatcher.d.ts"),
            path.join(base, "q/Q.d.ts"),
            path.join(base, "space-pen/space-pen.d.ts"),
            path.join(base, "status-bar/status-bar.d.ts"),
            path.join(base, "text-buffer/text-buffer.d.ts")
        ];

        stream.on("data", function() {
        });

        stream.on("error", done);

        stream.on("end", function() {
            targets
                .map(function (target) {
                    return fs.existsSync(target);
                })
                .forEach(function (exists) {
                    assert.strictEqual(exists, true);
                });
            done();
        });

        stream.write(file);
        stream.end();
    });

});
