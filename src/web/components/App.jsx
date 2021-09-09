import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import AppHeader from './AppHeader.jsx';
import ListVehicles from './ListVehicles.jsx';
import InsertVehicle from './InsertVehicle.jsx';
import FindVehicle from './FindVehicle.jsx';
import DeleteVehicle from './DeleteVehicle.jsx';


const Hello = () => {
    return (
        <div>
            HELLO WORLD
        </div>
    );
};

class App extends React.Component {
    constructor(props) {
      super(props);
    }
    
    componentDidMount() {
        // window.fleetAPI.editVehicle({chassisSeries:"aaa", chassisNumber: 1, color:"Green", type:"Truck"});
    }

    render() {
        return (
        <Router>
            <div style={{height:'10%', width:'100%'}}>
                <AppHeader />
            </div>
            <div style={{height:'90%', width:'100%'}}>
                <Switch>
                    <Route path="/list" component={ListVehicles} />
                    <Route path="/find" component={FindVehicle} />
                    <Route path="/insert" component={InsertVehicle} />
                    <Route path="/edit" component={Hello} />
                    <Route path="/delete" component={DeleteVehicle} />
                </Switch>
            </div>
        </Router>)
    }
}

export default App;