const Vehicle = require('./Vehicle.js');

class Bus extends Vehicle{
    constructor(chassisSeries, chassisNumber, color) {
        super(chassisSeries, chassisNumber, color, 'Bus', 42);
    }
}

module.exports = Bus;