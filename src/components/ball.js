import React, { Component } from 'react';

export default class Ball extends Component {
    constructor (props) {
        super(props);
        this.state = {
            animate: false,
            bottom: "50%",
            down: true,
            moveSpeed: 1,
        }
    }
    componentDidMount() {
        window.addEventListener('wheel', this.handlerChangeSpeed);
    };
    componentWillUnmount() {
        window.removeEventListener('wheel', this.handlerChangeSpeed);
    };

    moveBall = () => {
        let ballPosition = this.state.bottom;
        let ballPositionNum = Number(ballPosition.slice(0,-1));
        let moveSpeed = this.state.moveSpeed;
        if (this.state.down) {
            let ballPositionStr = ballPositionNum - moveSpeed + '%';
            this.setState({
                bottom: ballPositionStr
            });
            if (ballPositionNum <= 3.5) {
                this.setState({down: !this.state.down });
                console.log(ballPositionNum)
            }
        } else if (!this.state.down) {
            let ballPositionStr = ballPositionNum + moveSpeed + '%';
            this.setState({
                bottom: ballPositionStr
            });
            if (ballPositionNum >= 49) {
                this.setState({down: !this.state.down });
            }
        }
    };

    handlerAnimate = () => {
        this.setState({
            animate: !this.state.animate,
        });
        if (!this.state.animate) {
            this.moveBall();
            this.moveBallInterval = setInterval(this.moveBall, 24);
        } else {
            clearInterval(this.moveBallInterval);
            this.setState({
                animate: !this.state.animate
            })
        }
    };

    handlerChangeSpeed = (e) => {
        const deltaMove = -e.deltaY/200;
        let moveSpeed = this.state.moveSpeed + deltaMove;
        this.setState({moveSpeed});
        if (moveSpeed <= 0) {
            let moveSpeed = 0.5;
            this.setState({moveSpeed});
        } else if (moveSpeed >= 2) {
            let moveSpeed = 2;
            this.setState({moveSpeed});
        }
    };

    render() {
        const label = this.state.animate ? 'Stop' : 'Start';
        const ballStyle = {
            bottom: this.state.bottom
        };

        return (
            <div className="ball container" onScroll={this.handlerChangeSpeed}>
                <img style={ballStyle} className="ball__item" src='./img/ball.svg' alt="ball" />
                <button className="ball__action" onClick={this.handlerAnimate}>{label}</button>
                <p>Move speed: {this.state.moveSpeed}</p>
            </div>
        );
    }
}
