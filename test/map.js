
var sf = require('..');

exports['map a simple array'] = function (test) {
    test.async();
    
    var map = sf.map(function (data) { return data + 1; });
    
    map.run([1,2,3])
        .success(function(result) {
            test.ok(result);
            test.ok(Array.isArray(result));
            
            test.equal(result.length, 3);
            
            test.equal(result[0], 2);
            test.equal(result[1], 3);
            test.equal(result[2], 4);
            
            test.done();
        });    
};