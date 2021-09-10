import React from 'react';
import ShowVehicles from './ShowVehicles.jsx';

class ListVehicles extends React.Component {
    constructor(props) {
      super(props);

      this.state = {dataLoaded:false};
      this.vehicles = {};
    }

    loadVehicles() {
        window.fleetAPI.listVehicles();
        this.setState({dataLoaded:false});
    }
    
    componentDidMount() {
        window.fleetAPI.onListVehiclesReply((function(data) {
            this.vehicles = data;
            this.setState({dataLoaded:true});
        }).bind(this));
        this.loadVehicles();
    }

    componentWillUnmount() {
        window.fleetAPI.clearListeners();
    }

    render() {
        if(!this.state.dataLoaded) {
            return <div>LOADING DATA</div>
        }
        const vehicles = this.vehicles;
        return (
            <ShowVehicles vehicles={vehicles}/>
        );
    }
}

export default ListVehicles;