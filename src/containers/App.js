import React, { Component } from 'react';
import { connect } from "react-redux";

import Header from "../components/header";
import Content from "../components/content";

class App extends Component {
  render() {
    return (
        <div>
            <Header />
            <Content />
        </div>
    );
  }
}

function mapStateToProps(state) {
    const routing = state.routing;
    return {
        routing: routing
    };
}

function mapDispatchToProps(dispatch) {
    return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
