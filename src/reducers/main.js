import update from 'immutability-helper';

const initialState = {
    list: [
        {
            id: '1512560022211',
            name: 'Элемент 1',
            status: true,
        },
        {
            id: '1512560022212',
            name: 'Элемент 2',
            status: true,
        },
        {
            id: '1512560022213',
            name: 'Элемент 3',
            status: true,
        },
        {
            id: '1512560022214',
            name: 'Элемент 4',
            status: true,
        },
        {
            id: '1512560022215',
            name: 'Элемент 5',
            status: true
        }
    ]
};

export default function main (state = initialState, action) {
    switch (action.type) {
        case ("UPDATE__POSITION"): {
            const indexs = action.payload;
            const dragIndex = indexs.dragIndex;
            const hoverIndex = indexs.hoverIndex;
            const dragItem = {...state.list}[dragIndex];
            const newState = update(state, {
                list: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragItem]],
                },
            });
            return {
                ...newState,
            }
        }
        case ("EDIT__ITEM"): {
            const itemId = action.payload;
            const list = [...state.list];
            list.forEach((item) => {
                 if (item.id === itemId) {
                     item.status = false;
                 }
            });
            return {
                ...state,
                list
            }
        }
        case ("SAVE__ITEM"): {
            const itemVal = action.payload;
            const list = [...state.list];
            list.forEach((item) => {
                if (item.id === itemVal.id) {
                    item.name = itemVal.name;
                    item.status = true
                }
            });
            return {
                ...state,
                list
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
}
