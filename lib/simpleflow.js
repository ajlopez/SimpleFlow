
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

function Step(fn, step) {
    this.run = function (data) {
        this.execute(data,
            function (newdata) {
            },
            function (err) {
            });
    };
    
    this.execute = function (data, onsuccess, onfail) {
        if (step)
            step.execute(data, function (newdata) { apply(newdata, onsuccess, onfail); }, function (err) { onfail(err); });
        else
            apply(data, onsuccess, onfail);
    };
    
    function apply(data, onsuccess, onfail) {
        if (isAsync(fn))
            fn(data, function (err, newdata) {
                if (err)
                    onfail(err);
                else
                    onsuccess(newdata);
            });
        else
            try {
                var newdata = fn(data);
                onsuccess(newdata);
            }
            catch (err) {
                onfail(err);
            }
    }
}

function isAsync(fn) {
    return fn.length == 2;
}

function createSequence() {
    var step = null
    
    for (var n in arguments) 
        step = new Step(arguments[n], step);
    
    return step;
}

module.exports = {
    createFlow: createFlow,
    sequence: createSequence
};
