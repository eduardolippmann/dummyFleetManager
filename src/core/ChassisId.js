class ChassisId {
    #chassisSeries;
    #chassisNumber;
    constructor(chassisSeries, chassisNumber) {
        this.#chassisSeries = chassisSeries;
        this.#chassisNumber = chassisNumber;
    }
    getNumber() {
        return this.#chassisNumber;
    }
    getSeries() {
        return this.#chassisSeries;
    }
    conflictsWith(otherId) {
        if((this.getSeries() == otherId.getSeries()) || (this.getNumber() == otherId.getNumber())) {
            return true;
        }
        return false;
    }
    isEqual(otherId) {
        if((this.getSeries() == otherId.getSeries()) && (this.getNumber() == otherId.getNumber())) {
            return true;
        }
        return false;
    }
}

module.exports = ChassisId;