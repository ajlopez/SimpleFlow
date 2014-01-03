
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

module.exports = {
    createFlow: createFlow
};