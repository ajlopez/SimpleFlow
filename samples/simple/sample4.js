var sf = require('../..');

var seq = sf.sequence(
    function (data, next) {
        next(null, data + 1);
    },
    function (data, next) {
        next(null, data + 1);
    },
    function (data, next) {
        next(null, data + 1);
    }
);

seq.run(1).success(
    function (data) {
        console.log('result:', data);
    }
).fail(
    function (err) {
        console.log('error:', err);
    }
);
