import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import AppHeader from './AppHeader.jsx';
import ListVehicles from './ListVehicles.jsx';
import InsertVehicle from './InsertVehicle.jsx';
import FindVehicles from './FindVehicle.jsx';


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
        // window.fleetAPI.deleteVehicle({chassisSeries:"ccc", chassisNumber: 2});
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
                    <Route path="/find" component={FindVehicles} />
                    <Route path="/insert" component={InsertVehicle} />
                    <Route path="/edit" component={Hello} />
                    <Route path="/delete" component={Hello} />
                </Switch>
            </div>
        </Router>)
    }
}

export default App;