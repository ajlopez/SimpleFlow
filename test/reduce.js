
var sf = require('..');

exports['reduce a simple array'] = function (test) {
    test.async();
    
    var reduce = sf.reduce(function (data, accum) { return data + accum; }, 0);
    
    reduce.run([1,2,3])
        .success(function(result) {
            test.ok(result);
            
            test.equal(result, 6);
            
            test.done();
        });    
};