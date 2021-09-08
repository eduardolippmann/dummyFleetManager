import React from 'react';

class App extends React.Component {
    constructor(props) {
      super(props);
    }
    
    componentDidMount() {
        // window.fleetAPI.insertVehicle({chassisSeries:"ccc", chassisNumber: 3, color:"Blue", type:"Car"});
        // window.fleetAPI.editVehicle({chassisSeries:"aaa", chassisNumber: 1, color:"Green", type:"Truck"});
        // window.fleetAPI.findVehicle({chassisSeries:"ccc", chassisNumber: 3});
        // window.fleetAPI.listVehicles();
        // window.fleetAPI.deleteVehicle({chassisSeries:"ccc", chassisNumber: 2});
    }

    render() {
        return <div>Hello World</div>
    }
}

export default App;