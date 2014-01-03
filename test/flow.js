
var simpleflow = require('..');

exports['Create flow'] = function (test) {
    test.ok(simpleflow.createFlow(null, null));
};