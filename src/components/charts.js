import React, { Component } from 'react';
import {Line, Bar} from 'react-chartjs-2';

export default class Graphics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                type: 'line',
                data: {
                    labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                    datasets: [
                        {
                            label: null,
                            backgroundColor: 'rgba(255,99,132,0.2)',
                            borderColor: 'rgba(255,99,132,1)',
                            borderWidth: 1,
                            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                            hoverBorderColor: 'rgba(255,99,132,1)',
                            data: [5, 10, 7, 11, 5, 13, 10, 5, 11, 5, 12, 8],
                            lineTension: 0,
                        }
                    ]
                },
                options: {
                    legend: {
                        display: false,
                    }
                }
            },
        }
    }

    showChart = () => {
        const line = <Line
            data={this.state.chartData.data}
            width = {500}
            options={this.state.chartData.options}
        />;
        const bar = <Bar
            data={this.state.chartData.data}
            width = {500}
            options={this.state.chartData.options}
        />;
        switch (this.state.chartData.type) {
            case "line":
                return line;
            case "bar":
                return bar;
            default:
                return line
        }
    };

    handlerSelectLiner = () => {
        const type = "line";
        this.setState({
            chartData: {...this.state.chartData, type}
        });
    };

    handlerSelectBar = () => {
        const type = "bar";
        this.setState({
            chartData: {...this.state.chartData, type}
        });
    };

    render() {
        return (
            <div className="charts container">
                <h2 className="charts__title row">Chart example</h2>
                <div className="chart row">
                    {this.showChart()}
                </div>
                <div className="charts__action row">
                    <button onClick={this.handlerSelectLiner}>Show liner</button>
                    <button onClick={this.handlerSelectBar}>Show bar</button>
                </div>
            </div>
        );
    }
}

