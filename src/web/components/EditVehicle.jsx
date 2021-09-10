import React from 'react';
import ShowVehicles from './ShowVehicles.jsx';


const colors = ['Red', 'Blue', 'Green', 'Orange', 'Black', 'White'];

class EditVehicle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMsg: '',
            findSuccess: false,
            chassisSeries: '',
            chassisNumber: '',
            color: ''
        };
        this.vehicle = {};

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.editVehicle = this.editVehicle.bind(this);
    }

    componentDidMount() {
        window.fleetAPI.onFindComplete(((data)=>{
            this.vehicle = data;
            this.setState({findSuccess:true, color:data.color});
        }).bind(this));
        window.fleetAPI.onFindError(((err)=>this.setState({findSuccess:false, errorMsg:err})).bind(this));
        window.fleetAPI.onEditComplete((()=>this.setState({findSuccess:false, errorMsg:''})).bind(this));

    }

    componentWillUnmount() {
        window.fleetAPI.clearListeners();
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

    handleColorChange(event) {
        const value = event.target.value;

        this.setState({
            color: value
        });
    }

    editVehicle() {
        window.fleetAPI.editVehicle({
            chassisSeries: this.vehicle.chassisSeries, 
            chassisNumber: this.vehicle.chassisNumber,
            color:this.state.color,
            type:this.vehicle.type
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
        const selectColor = this.state.findSuccess ? 
            <select name="color" value={this.state.color} onChange={this.handleColorChange}>
                {colors.map((color)=><option value={color}>{color}</option>)}
            </select>
            : '';
        const editButton = this.state.findSuccess ? <button onClick={this.editVehicle}>Edit</button> : '';
        const vehicle = this.state.findSuccess ? <ShowVehicles vehicles={[this.vehicle]}/> : '';
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
                {vehicle}
                {selectColor}
                {editButton}
            </React.Fragment>
        );
    }
}

export default EditVehicle;