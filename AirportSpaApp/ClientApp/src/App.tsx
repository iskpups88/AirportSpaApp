import React from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import FlightInfo from './containers/FlightInfo';
import { Counter } from './components/Counter';
import PassengerInfo from './containers/PassengerInfo';

import './custom.css'


const App = () => {
    return (
        <Layout>
            <Route exact path='/' component={PassengerInfo} />
            {/* <Route path='/counter' component={Counter} /> */}
            <Route path='/flights' component={FlightInfo} />
        </Layout>
    );
}

export default App;