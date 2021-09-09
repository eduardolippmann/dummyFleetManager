const ChassisId = require('./ChassisId.js');

class Vehicle {
    #chassisId;
    #color;
    #type;
    #numberOfPassengers;
    constructor(chassisSeries, chassisNumber, color, type, numberOfPassengers) {
        this.#chassisId = new ChassisId(chassisSeries, chassisNumber);
        this.#color = color;
        this.#type = type;
        this.#numberOfPassengers = numberOfPassengers;
        if(this.constructor == Vehicle) {
            throw new TypeError('Abstract class Vehicle cannot be instantiated');
        }
    }
    getChassisSeries() {
        return this.#chassisId.getSeries();
    }
    getChassisNumber() {
        return this.#chassisId.getNumber();
    }
    getChassisId() {
        return this.#chassisId;
    }
    getColor() {
        return this.#color;
    }
    setColor(color) {
        this.#color = color;
    }
    getType() {
        return this.#type;
    }
    getNumberOfPassengers() {
        return this.#numberOfPassengers;
    }
    toRaw() {
        return ({
            chassisSeries : this.getChassisSeries(),
            chassisNumber : this.getChassisNumber(),
            color : this.getColor(),
            "type" : this.getType(),
            numberOfPassengers : this.getNumberOfPassengers()
        });
    }
}

module.exports = Vehicle;