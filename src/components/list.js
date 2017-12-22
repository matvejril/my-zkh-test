import React, { Component } from 'react';

import { connect } from 'react-redux';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Item from './item';

import updatePosition from '../actions/updatePosition';
import editItem from '../actions/editItem';
import saveItem from '../actions/saveItem';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: props.list
        }
    }

    moveCard = (dragIndex, hoverIndex) =>  {
        const indexes = {
            dragIndex,
            hoverIndex,
        };
        this.props.updatePosition(indexes);
    };

    render() {
        const list = this.props.list;
        return (
            <ul className="list">
                {list.map((item, index) => {
                    return <Item item={item}
                                 index={index}
                                 key={item.id}
                                 editItem={this.props.editItem}
                                 saveItem={this.props.saveItem}
                                 moveCard={this.moveCard}
                    />
                })}
            </ul>
        );
    }
}

function mapStateToProps(state) {
    const list = state.main.list;
    return {
        list
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updatePosition: (indexes) => {
            dispatch(updatePosition(indexes))
        },
        editItem: (itemId) => {
            dispatch(editItem(itemId))
        },
        saveItem: (itemVal) => {
            dispatch(saveItem(itemVal))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DragDropContext(HTML5Backend)(List));
