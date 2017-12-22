import React, { Component } from 'react';

import Navigation from './navigation';

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <Navigation />
            </div>
        );
    }
}
