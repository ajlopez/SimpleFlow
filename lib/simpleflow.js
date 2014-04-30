
function createFlow(steps, errfn) {
    var flow = createSequence.apply(this, steps);
    
    if (errfn)
        flow.fail(errfn);
        
    return flow;
}

function Future() {
    var hasvalue = false;
    var haserror = false;
    var value = null;
    var error = null;
    var onsuccess = null;
    var onfail = null;
    
    this.success = function (fn) {
        if (hasvalue)
            fn(value);
        else
            onsuccess = fn;
            
        return this;
    };
    
    this.fail = function (fn) {
        if (haserror)
            fn(error);
        else
            onfail = fn;
            
        return this;
    };
    
    this.setValue = function (newvalue) {
        value = newvalue;
        hasvalue = true;
        
        if (onsuccess)
            onsuccess(value);
    };
    
    this.setError = function (err) {
        error = err;
        haserror = true;
        
        if (onfail)
            onfail(err);
    };
}

function Step(fn, step) {
    var onsuccess = null;
    var onfail = null;
    
    this.run = function (data) {
        var future = new Future();
        
        this.execute(data,
            function (newdata) {
                if (onsuccess)
                    onsuccess(newdata);
                    
                future.setValue(newdata);
            },
            function (err) {
                if (onfail)
                    onfail(err);

                future.setError(err);
            });
            
        return future;
    };
    
    this.fail = function (fn) {
        onfail = fn;
        return this;
    };
    
    this.success = function (fn) {
        onsuccess = fn;
        return this;
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
    var step = null;
    
    for (var n in arguments) 
        step = new Step(arguments[n], step);
    
    return step;
}

function Map(fn) {
    this.run = function (data) {
        var future = new Future();

        var result = [];
        
        for (var n in data)
            result[n] = fn(data[n]);

        future.setValue(result);
        
        return future;
    };
}

function createMap(fn) {
    return new Map(fn)
}

function Reduce(fn, initial) {
    this.run = function (data) {
        var result = initial;        
        var future = new Future();
        
        for (var n in data)
            result = fn(data[n], result);

        future.setValue(result);
        
        return future;
    };
}

function createReduce(fn, initial) {
    return new Reduce(fn, initial);
}

module.exports = {
    createFlow: createFlow,
    sequence: createSequence,
    map: createMap,
    reduce: createReduce
};
