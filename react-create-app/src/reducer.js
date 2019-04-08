export default (state = { count: 0 , selections : { categories : [], areas : [], amenities : [], listings : []}}, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + 1
            }
        case 'DECREMENT':
            return {
                count: state.count - 1
            }
        case 'UPDATE':
            return {
                selections: state.selections
            }
        default:
            return state
    }
}
