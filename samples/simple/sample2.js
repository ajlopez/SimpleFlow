var sf = require('../..');

var seq = sf.sequence(
    function (data, next) {
        console.log(data);
        next(null, data + 1);
    },
    function (data, next) {
        console.log(data);
        next(null, data + 1);
    },
    function (data, next) {
        console.log(data);
        next(null, data + 1);
    }
);

seq.run(1);
