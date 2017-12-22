export default function saveItem (itemVal) {
    return {
        type: "SAVE__ITEM",
        payload: itemVal
    }
}
