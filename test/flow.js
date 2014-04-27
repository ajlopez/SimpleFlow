
var simpleflow = require('..');

/*
exports['Create flow'] = function (test) {
    test.ok(simpleflow.createFlow([], function (err) {}));
};
*/

exports['Run one step flow'] = function (test) {
    test.async();
    var flow = simpleflow.createFlow([step1], errfn);
    
    flow.run(1);
    
    function step1(value) {
        test.equal(value, 1);
        test.done();
    }
    
    function errfn(err) {
        test.fail();
    }
};

exports['Run two steps flow'] = function (test) {
    test.async();
    var flow = simpleflow.createFlow([step1, step2], errfn);
    
    flow.run(1);
    
    function step1(value, next) {
        test.equal(value, 1);
        next(null, value + 1);
    }
    
    function step2(value, next) {
        test.equal(value, 2);
        test.done();
    }
    
    function errfn(err) {
        test.fail();
    }
};

exports['Run error function in flow'] = function (test) {
    test.async();
    var flow = simpleflow.createFlow([step1, step2], errfn);
    
    flow.run(1);
    
    function step1(value, next) {
        test.equal(value, 1);
        next("error", null);
    }
    
    function step2(value, next) {
        test.equal(value, 2);
    }
    
    function errfn(err) {
        test.equal(err, "error");
        test.done();
    }
};