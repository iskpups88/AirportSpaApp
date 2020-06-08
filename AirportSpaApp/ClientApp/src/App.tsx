import React from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import FlightInfo from './containers/FlightInfo';
import PassengerInfo from './containers/PassengerInfo';

import './custom.css'
import AircraftMemberInfo from './containers/AircraftMemberInfo';


const App = () => {
    return (
        <Layout>
            <Route exact path='/' component={PassengerInfo} />
            <Route path='/aircraftMembers' component={AircraftMemberInfo} />
            <Route path='/flights' component={FlightInfo} />
        </Layout>
    );
}

export default App;