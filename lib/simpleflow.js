
function Flow(steps, errfn) {
    this.run = function (value) {
        var nstep = 0;
        
        dostep();
        
        function dostep() {
            if (nstep >= steps.length)
                return;
              
            steps[nstep++](value, function (err, newvalue) {
                if (err) {
                    errfn(err);
                    return;
                }
                
                value = newvalue;
                setImmediate(function () { dostep(); });
            });
        }
    }
}

function createFlow(steps, errfn) {
    return new Flow(steps, errfn);
}

function Step(fn) {
    this.run = function (data) {
        if (isAsync(fn))
            fn(data, function (err, data) {});
        else
            fn(data);
    };
}

function isAsync(fn) {
    return fn.length == 2;
}

function createSequence() {
    return new Step(arguments[0]);
}

module.exports = {
    createFlow: createFlow,
    sequence: createSequence
};
