const Circuit = require('./handlers/circuit'); 

const circuit = new Circuit();

module.exports = [
    {
        action: 'getById',
        h: circuit.getById,
    },
];
