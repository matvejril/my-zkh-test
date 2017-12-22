import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navigation extends Component {
    render() {
        return (
            <ul className="navigation">
                <li><Link to='/list'>List</Link></li>
                <li><Link to='/graphics'>Graphics</Link></li>
                <li><Link to='/ball'>Ball</Link></li>
            </ul>
        );
    }
}
