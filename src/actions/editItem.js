export default function editItem (itemId) {
    return {
        type: 'EDIT__ITEM',
        payload: itemId
    }
}
