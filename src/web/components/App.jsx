import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import AppHeader from './AppHeader.jsx';
import ListVehicles from './ListVehicles.jsx';
import InsertVehicle from './InsertVehicle.jsx';
import FindVehicle from './FindVehicle.jsx';
import DeleteVehicle from './DeleteVehicle.jsx';
import EditVehicle from './EditVehicle.jsx';


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

    render() {
        return (
        <Router>
            <div style={{height:'15%', width:'98%'}}>
                <AppHeader />
            </div>
            <div style={{height:'85%', width:'98%'}}>
                <Switch>
                    <Route path="/list" component={ListVehicles} />
                    <Route path="/find" component={FindVehicle} />
                    <Route path="/insert" component={InsertVehicle} />
                    <Route path="/edit" component={EditVehicle} />
                    <Route path="/delete" component={DeleteVehicle} />
                </Switch>
            </div>
        </Router>)
    }
}

export default App;