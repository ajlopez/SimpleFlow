
function Flow(steps, errfn) {
}

function createFlow(steps, errfn) {
    return new Flow(steps, errfn);
}

module.exports = {
    createFlow: createFlow
};