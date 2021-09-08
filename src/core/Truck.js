const Vehicle = require('./Vehicle.js');

class Truck extends Vehicle{
    constructor(chassisSeries, chassisNumber, color) {
        super(chassisSeries, chassisNumber, color, 'Truck', 1);
    }
}

module.exports = Truck;