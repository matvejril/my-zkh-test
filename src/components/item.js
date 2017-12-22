import React, { Component } from 'react';

import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';

import flow from 'lodash/flow';

const cardSource = {
    beginDrag(props) {
        return {
            index: props.index,
        };
    }
};

const cardTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return
        }

        // Time to actually perform the action
        props.moveCard(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    }
};

class Item extends Component {
    constructor (props) {
        super(props);
        this.state = {
            name: props.item.name
        };
    };

    handlerEdit = () => {
        const itemId = this.props.item.id;
        this.props.editItem(itemId);
    };

    handlerSave = () => {
        const itemVal = {
            id: this.props.item.id,
            name: this.state.name,
        };
        this.props.saveItem(itemVal);
    };

    changeValue = (e) => {
        const name = e.target.value;
        this.setState({name});
    };

    render() {
        const { connectDragSource, connectDropTarget, isDragging } = this.props;
        const opacity = isDragging ? 0 : 1;

        const editContent = <input className="item__input" type="text" value={this.state.name} onChange={this.changeValue} />;
        const saveContent = <p className="item__content">{this.props.item.name}</p>;
        const rtContent = this.props.item.status ? saveContent : editContent;

        const editBtn = <button className="item__btn" onClick={this.handlerEdit}>Edit</button>;
        const saveBtn = <button className="item__btn" onClick={this.handlerSave}>Save</button>;
        const rtBtn = this.props.item.status ? editBtn : saveBtn;
        return connectDragSource(
            connectDropTarget(
                <li className="item" style={{opacity}}>
                    <p className="item__num">№ {this.props.index + 1}.</p>
                    {rtContent}
                    {rtBtn}
                </li>
            )
        );
    }
}

export default flow (
    DragSource('card', cardSource, (connect, monitor) => {
        return {
            connectDragSource: connect.dragSource(),
            isDragging: monitor.isDragging(),
        };
    }),
    DropTarget('card', cardTarget, (connect) => {
        return {
            connectDropTarget: connect.dropTarget(),
        };
    })
)(Item);
