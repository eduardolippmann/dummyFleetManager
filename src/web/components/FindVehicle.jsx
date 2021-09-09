import React from 'react';

class FindVehicle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMsg: '',
            findSuccess: false,
            chassisSeries: '',
            chassisNumber: '',
        };
        this.vehicle = {};

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        window.fleetAPI.onFindComplete(((data)=>{
            this.vehicle = data;
            this.setState({findSuccess:true});
        }).bind(this));
        window.fleetAPI.onFindError(((err)=>this.setState({findSuccess:false, errorMsg:err})).bind(this));
    }

    handleSubmit() {
        this.setState({errorMsg:'',findSuccess: false});
        window.fleetAPI.findVehicle({
            chassisSeries: this.state.chassisSeries,
            chassisNumber: parseInt(this.state.chassisNumber)
        });
    }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value,
            errorMsg:'',
            findSuccess: false
        });
    }

    checkInputs() {
        let notAlphaNumTest = new RegExp(/[^a-zA-Z0-9]/g);
        let notNumberTest = new RegExp(/[^0-9]/g);
        const chassisSeries = this.state.chassisSeries;
        const chassisNumber = this.state.chassisNumber;
        if(chassisSeries.length == 0 || notAlphaNumTest.test(chassisSeries)) {
            return false;
        }
        if(chassisNumber.length == 0 || notNumberTest.test(chassisNumber)) {
            return false;
        }
        return true;
    }

    render() {
        console.log(this.vehicle);
        const insertDisabled = !this.checkInputs();
        const errorMsg = this.state.errorMsg ? <div>{this.state.errorMsg}</div> : '';
        const findSuccess = this.state.findSuccess ? <div>Vehicle found: {JSON.stringify(this.vehicle)}</div> : '';
        return (
            <React.Fragment>
                <label>
                    Chassis Series
                <input type="text" name="chassisSeries" onChange={this.handleInputChange} />
                </label>
                <label>
                    Chassis Number
                <input type="text" name="chassisNumber" onChange={this.handleInputChange} />
                </label>
                <button disabled={insertDisabled} onClick={this.handleSubmit}>Find</button>
                {errorMsg}
                {findSuccess}
            </React.Fragment>
        );
    }
}

export default FindVehicle;