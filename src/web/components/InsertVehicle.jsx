import React from 'react';

const vehicleTypes = ['Truck', 'Car', 'Bus'];
const colors = ['Red', 'Blue', 'Green', 'Orange', 'Black', 'White'];

class InsertVehicle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMsg: '',
            insertSuccess: false,
            chassisSeries: '',
            chassisNumber: '',
            color: 'Blue',
            type: 'Truck'
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        window.fleetAPI.onInsertComplete((()=>this.setState({insertSuccess:true})).bind(this));
        window.fleetAPI.onInsertError(((err)=>this.setState({insertSuccess:false, errorMsg:err})).bind(this));
    }

    handleSubmit() {
        this.setState({errorMsg:'', insertSuccess: false});
        window.fleetAPI.insertVehicle({
            chassisSeries: this.state.chassisSeries,
            chassisNumber: parseInt(this.state.chassisNumber),
            color: this.state.color,
            type: this.state.type});
    }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value,
            errorMsg:'',
            insertSuccess: false
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
        const insertDisabled = !this.checkInputs();
        const errorMsg = this.state.errorMsg ? <div>{this.state.errorMsg}</div> : '';
        const successMsg = this.state.insertSuccess ? <div>Vehicle inserted successfully</div> : '';
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
                    <button disabled={insertDisabled} onClick={this.handleSubmit}>Insert</button>
                {errorMsg}
                {successMsg}
            </React.Fragment>
        );
    }
}

export default InsertVehicle;