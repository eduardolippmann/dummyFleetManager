const fs = require('fs');
const ChassisId = require('./ChassisId');
const Truck = require('./Truck.js');
const Car = require('./Car.js');
const Bus = require('./Bus.js');

const storagePath = __dirname + '/../../storage.json';

module.exports = {
    insertVehicle : insertVehicle,
    listVehicles : listVehicles,
    findVehicle : findVehicle,
    editVehicle : editVehicle,
    deleteVehicle : deleteVehicle
}

function insertVehicle(vehicleInfo, cb) {
    if(!isVehicleInfoValid(vehicleInfo)) {
        cb('Invalid vehicle parameters', null);
        return;
    }
    let vehicle = createVehicle(vehicleInfo);
    if(chassisIdAlreadyExists(vehicle.getChassisId())) {
        cb('Chassis already exist', null);
        return;
    }
    saveVehicle(vehicle, cb);
}

function listVehicles(cb) {
    let rawVehicles = JSON.parse(fs.readFileSync(storagePath));
    cb(null, rawVehicles);
}

function findVehicle(chassisInfo, cb) {
    if(!isChassisInfoValid(chassisInfo)) {
        cb('Invalid chassis info', null);
        return;
    }
    let chassisId = new ChassisId(chassisInfo.chassisSeries, chassisInfo.chassisNumber);
    let vehicles = readAllVehicles();
    for(var i = 0; i < vehicles.length; i++) {
        if(chassisId.isEqual(vehicles[i].getChassisId())) {
            cb(null, vehicles[i].toRaw());
            return;
        }
    }
    cb('Vehicle not found', null);
}

function editVehicle(vehicleInfo, cb) {
    if(!isVehicleInfoValid(vehicleInfo)) {
        cb('Invalid vehicle parameters', null);
        return;
    }
    findVehicle(vehicleInfo, function(err, vehicle) {
        if(err) {
            cb(err, null);
            return;
        }
        let newVehicle = createVehicle(vehicleInfo);
        updateVehicle(newVehicle, cb);
    });
}

function deleteVehicle(chassisInfo, cb) {
    if(!isChassisInfoValid(chassisInfo)) {
        cb('Invalid chassis info', null);
        return;
    }
    let chassisId = new ChassisId(chassisInfo.chassisSeries, chassisInfo.chassisNumber);
    removeVehicle(chassisId, cb);
}

function isVehicleInfoValid(vehicleInfo) {
    if(typeof vehicleInfo.chassisNumber == 'number') {
        if(typeof vehicleInfo.chassisSeries == 'string') {
            if(typeof vehicleInfo.color == 'string') {
                if(vehicleInfo.type === 'Truck' || vehicleInfo.type === 'Car' || vehicleInfo.type === 'Bus') {
                    return true;
                }
            }
        }
    }
    return false;
}

function isChassisInfoValid(chassisInfo) {
    if(typeof chassisInfo.chassisNumber == 'number') {
        if(typeof chassisInfo.chassisSeries == 'string') {
            return true;
        }
    }
    return false;
}

function createVehicle(vehicleInfo) {
    switch(vehicleInfo.type) {
        case 'Truck':
            return new Truck(vehicleInfo.chassisSeries, vehicleInfo.chassisNumber, vehicleInfo.color);
        case 'Car':
            return new Car(vehicleInfo.chassisSeries, vehicleInfo.chassisNumber, vehicleInfo.color);
        case 'Bus':
            return new Bus(vehicleInfo.chassisSeries, vehicleInfo.chassisNumber, vehicleInfo.color);
        default:
            throw new Error('Unhandled vehicle type');
    }
}

function chassisIdAlreadyExists(chassisId) {
    let vehicles = readAllVehicles();
    for(var i = 0; i < vehicles.length; i++) {
        if(chassisId.conflictsWith(vehicles[i].getChassisId())) {
            return true;
        }
    }
    return false;
}

function readAllVehicles() {
    let vehicles = [];
    let rawVehicles = JSON.parse(fs.readFileSync(storagePath));
    for(var i = 0; i < rawVehicles.length; i++) {
        vehicles.push(createVehicle(rawVehicles[i]));
    }
    return vehicles;
}

function saveVehicle(vehicle, cb) {
    let rawVehicles = JSON.parse(fs.readFileSync(storagePath));
    let vehicleInfo = {
        chassisSeries : vehicle.getChassisSeries(),
        chassisNumber : vehicle.getChassisNumber(),
        color : vehicle.getColor(),
        "type" : vehicle.getType(),
        numberOfPassengers : vehicle.getNumberOfPassengers()
    };
    rawVehicles.push(vehicleInfo);
    fs.writeFileSync(storagePath, JSON.stringify(rawVehicles));
    cb(null, vehicleInfo);
}

function updateVehicle(newVehicle, cb) {
    let rawVehicles = JSON.parse(fs.readFileSync(storagePath));
    for(var i = 0; i < rawVehicles.length; i++) {
        let oldVehicle = createVehicle(rawVehicles[i]);
        if(oldVehicle.getChassisId().isEqual(newVehicle.getChassisId())) {
            let newVehicleInfo = {
                chassisSeries : newVehicle.getChassisSeries(),
                chassisNumber : newVehicle.getChassisNumber(),
                color : newVehicle.getColor(),
                "type" : newVehicle.getType(),
                numberOfPassengers : newVehicle.getNumberOfPassengers()
            };
            rawVehicles[i] = newVehicleInfo;
            fs.writeFileSync(storagePath, JSON.stringify(rawVehicles));
            cb(null, newVehicle);
            return;
        }
    }
    cb('Error updating vehicle', null);
}

function removeVehicle(chassisId, cb) {
    let rawVehicles = JSON.parse(fs.readFileSync(storagePath));
    for(var i = 0; i < rawVehicles.length; i++) {
        let vehicle = createVehicle(rawVehicles[i]);
        if(vehicle.getChassisId().isEqual(chassisId)) {
            rawVehicles.splice(i, 1);
            fs.writeFileSync(storagePath, JSON.stringify(rawVehicles));
            cb(null, true);
            return;
        }
    }
    cb('Error deleting vehicle', null);
}