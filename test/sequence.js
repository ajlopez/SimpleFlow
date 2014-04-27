
var sf = require('..');

exports['execute sync function in sequence'] = function (test) {
    test.async();
    
    var seq = sf.sequence(function (data) {
        test.equal(data, 42);
        test.done();
    });
    
    seq.run(42);
};

exports['execute sync function in sequence with success'] = function (test) {
    test.async();
    
    var seq = sf.sequence(function (data) {
        test.equal(data, 42);
        return data + 1;
    });
    
    seq.run(42).success(function (data) {
        test.equal(data, 43);
        test.done();
    });
};

exports['execute two sync functions in sequence'] = function (test) {
    test.async();
    
    var seq = sf.sequence(
        function (data) {
            test.equal(data, 42);
            return data + 1;
        },
        function (data) {
            test.equal(data, 43);
            test.done();
        }
    );
    
    seq.run(42);
};

exports['execute two sync function in sequence with success'] = function (test) {
    test.async();
    
    var seq = sf.sequence(
        function (data) {
            test.equal(data, 42);
            return data + 1;
        },
        function (data) {
            test.equal(data, 43);
            return data + 1;
        }
    );
    
    seq.run(42).success(function (data) {
        test.equal(data, 44);
        test.done();
    });
};

exports['execute three sync functions in sequence'] = function (test) {
    test.async();
    
    var seq = sf.sequence(
        function (data) {
            test.equal(data, 42);
            return data + 1;
        },
        function (data) {
            test.equal(data, 43);
            return data + 1;
        },
        function (data) {
            test.equal(data, 44);
            test.done();
        }
    );
    
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

exports['execute async function in sequence with success'] = function (test) {
    test.async();
    
    var seq = sf.sequence(function (data, next) {
        test.equal(data, 42);
        next(null, data + 1);
    });
    
    seq.run(42).success(function (data) {
        test.equal(data, 43);
        test.done();
    });
};

exports['execute two async function in sequence'] = function (test) {
    test.async();
    
    var seq = sf.sequence(
        function (data, next) {
            test.ok(next);
            next(null, data + 1);
        },        
        function (data, next) {
            test.ok(next);
            test.done();
            next(null, null);
        }
    );
    
    seq.run(42);
};

exports['execute two async function in sequence with success'] = function (test) {
    test.async();
    
    var seq = sf.sequence(
        function (data, next) {
            test.equal(data, 42);
            test.ok(next);
            next(null, data + 1);
        },        
        function (data, next) {
            test.equal(data, 43);
            test.ok(next);
            next(null, data + 1);
        }
    );
    
    seq.run(42).success(function (data) {
        test.equal(data, 44);
        test.done();
    });
};

exports['execute three async function in sequence'] = function (test) {
    test.async();
    
    var seq = sf.sequence(
        function (data, next) {
            test.equal(data, 42);
            test.ok(next);
            next(null, data + 1);
        },        
        function (data, next) {
            test.equal(data, 43);
            test.ok(next);
            next(null, data + 1);
        },        
        function (data, next) {
            test.equal(data, 44);
            test.ok(next);
            test.done();
            next(null, null);
        }
    );
    
    seq.run(42);
};

