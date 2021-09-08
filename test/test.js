const assert = require('assert');

const Vehicle = require('../src/core/Vehicle.js');
const Truck = require('../src/core/Truck.js');
const Car = require('../src/core/Car.js');
const Bus = require('../src/core/Bus.js');
const ChassisId = require('../src/core/ChassisId.js');

describe('Vehicle', function() {
    describe('Abstract class test', function () {
        it('Should throw when attempting to instantiate object', function() {
            let [chassisSeries, chassisNumber, color, type, numberOfPassengers] = ['aaa', 1, 'Green', 'Airplane', 300];
            assert.throws(() => {
                let vehicle = new Vehicle(chassisSeries, chassisNumber, color, type, numberOfPassengers);
            },
            {
                name: 'TypeError'
            })
        })
    });
});

describe('ChassisId', function() {
    describe('#getNumber', function() {
        it('Should return the chassis number', function() {
            let [chassisSeries, chassisNumber] = ['aaa', 123];
            let chassisId = new ChassisId(chassisSeries, chassisNumber);
            assert.strictEqual(chassisId.getNumber(), chassisNumber);
        });
    });
    describe('#getSeries', function() {
        it('Should return the chassis series', function() {
            let [chassisSeries, chassisNumber] = ['abc', 1];
            let chassisId = new ChassisId(chassisSeries, chassisNumber);
            assert.strictEqual(chassisId.getSeries(), chassisSeries);
        });
    });
    describe('#conflictsWith', function() {
        let chassisId1 = new ChassisId('abc', 123);
        it('Should return true if series AND number matches between two chassis id', function() {
            let chassisId2 = new ChassisId('abc', 123); // full match
            assert.strictEqual(chassisId1.conflictsWith(chassisId2), true);
        });
        it('Should return true if series OR number matches', function() {
            let chassisId3 = new ChassisId('abc', 456); // series match
            let chassisId4 = new ChassisId('def', 123); // number match
            assert.strictEqual(chassisId1.conflictsWith(chassisId3), true);
            assert.strictEqual(chassisId1.conflictsWith(chassisId4), true);
        });
        it('Should return false if neither series nor number matches', function() {
            let chassisId5 = new ChassisId('def', 456); // no match
            assert.strictEqual(chassisId1.conflictsWith(chassisId5), false);
        });
    });
    describe('#isEqual', function() {
        let chassisId1 = new ChassisId('abc', 123);
        it('Should return true if series AND number matches between two chassis id', function() {
            let chassisId2 = new ChassisId('abc', 123); // full match
            assert.strictEqual(chassisId1.isEqual(chassisId2), true);
        });
        it('Should return false if series OR number matches', function() {
            let chassisId3 = new ChassisId('abc', 456); // series match
            let chassisId4 = new ChassisId('def', 123); // number match
            assert.strictEqual(chassisId1.isEqual(chassisId3), false);
            assert.strictEqual(chassisId1.isEqual(chassisId4), false);
        });
        it('Should return false if neither series nor number matches', function() {
            let chassisId5 = new ChassisId('def', 456); // no match
            assert.strictEqual(chassisId1.isEqual(chassisId5), false);
        });
    });
});

describe('Truck', function() {
    let [chassisSeries, chassisNumber, color] = ['aaa', 1, 'Green'];
    let truck1 = new Truck(chassisSeries, chassisNumber, color);
    describe('#getChassisSeries', function() {
        it('Should return the value of private member #chassisSeries', function() {
            assert.strictEqual(truck1.getChassisSeries(), chassisSeries);
        });
    });
    describe('#getChassisNumber', function() {
        it('Should return the value of private member #chassisNumber', function() {
            assert.strictEqual(truck1.getChassisNumber(), chassisNumber);
        });
    });
    describe('#getColor', function() {
        it('Should return the value of private member #color', function() {
            assert.strictEqual(truck1.getColor(), color);
        });
    });
    describe('#getType', function() {
        it('Should return "Truck"', function() {
            assert.strictEqual(truck1.getType(), 'Truck');
        });
    });
    describe('#getNumberOfPassengers', function() {
        it('Should return 1', function() {
            assert.strictEqual(truck1.getNumberOfPassengers(), 1);
        });
    });
});

describe('Car', function() {
    let [chassisSeries, chassisNumber, color] = ['bbbb', 2, 'Red'];
    let car1 = new Car(chassisSeries, chassisNumber, color);
    describe('#getChassisSeries', function() {
        it('Should return the value of private member #chassisSeries', function() {
            assert.strictEqual(car1.getChassisSeries(), chassisSeries);
        });
    });
    describe('#getChassisNumber', function() {
        it('Should return the value of private member #chassisNumber', function() {
            assert.strictEqual(car1.getChassisNumber(), chassisNumber);
        });
    });
    describe('#getColor', function() {
        it('Should return the value of private member #color', function() {
            assert.strictEqual(car1.getColor(), color);
        });
    });
    describe('#getType', function() {
        it('Should return "Car"', function() {
            assert.strictEqual(car1.getType(), 'Car');
        });
    });
    describe('#getNumberOfPassengers', function() {
        it('Should return 4', function() {
            assert.strictEqual(car1.getNumberOfPassengers(), 4);
        });
    });
});

describe('Bus', function() {
    let [chassisSeries, chassisNumber, color] = ['aaa', 1, 'Green'];
    let bus1 = new Bus(chassisSeries, chassisNumber, color);
    describe('#getChassisSeries', function() {
        it('Should return the value of private member #chassisSeries', function() {
            assert.strictEqual(bus1.getChassisSeries(), chassisSeries);
        });
    });
    describe('#getChassisNumber', function() {
        it('Should return the value of private member #chassisNumber', function() {
            assert.strictEqual(bus1.getChassisNumber(), chassisNumber);
        });
    });
    describe('#getColor', function() {
        it('Should return the value of private member #color', function() {
            assert.strictEqual(bus1.getColor(), color);
        });
    });
    describe('#getType', function() {
        it('Should return "Bus"', function() {
            assert.strictEqual(bus1.getType(), 'Bus');
        });
    });
    describe('#getNumberOfPassengers', function() {
        it('Should return 42', function() {
            assert.strictEqual(bus1.getNumberOfPassengers(), 42);
        });
    });
});