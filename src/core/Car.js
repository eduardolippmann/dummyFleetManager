const Vehicle = require('./Vehicle.js');

class Car extends Vehicle{
    constructor(chassisSeries, chassisNumber, color) {
        super(chassisSeries, chassisNumber, color, 'Car', 4);
    }
}

module.exports = Car;