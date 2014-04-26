
var sf = require('..');

exports['execute sync function in sequence'] = function (test) {
    var seq = sf.sequence(function (data) {
        test.equal(data, 42);
        test.done();
    });
    
    seq.run(42);
};

exports['execute async function in sequence'] = function (test) {
    test.async();
    
    var seq = sf.sequence(function (data, next) {
        test.equal(data, 42);
        test.ok(next);
        test.done();
        next(null, null);
    });
    
    seq.run(42);
};