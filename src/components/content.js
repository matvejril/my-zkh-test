import React, { Component } from 'react';
import { Route, Switch } from 'react-router'
import { connect } from 'react-redux';

import List from "../components/list";
import Graphics from './charts';
import Ball from '../components/ball';
import NotFound from '../components/notFound';

export default class Content extends Component {
    render() {
        return (
            <div className="content container">
                <div className="row">
                    <ConnectedSwitch>
                        <Route path="/list" component={List} />
                        <Route path="/graphics" component={Graphics} />
                        <Route path="/ball" component={Ball} />
                        <Route component={NotFound}/>
                    </ConnectedSwitch>
                </div>
            </div>
        );
    }
}

const ConnectedSwitch = connect(state => ({
    location: state.location
}))(Switch);
