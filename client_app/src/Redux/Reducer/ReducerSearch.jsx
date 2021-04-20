const initialState = {
    search: ''
}

const ReducerSearch = (state = initialState, action) => {

    switch(action.type){

        case 'ADD_SEARCH':
        
            state = {
                search: action.data
            }

            return state

        case 'DELETE_SEARCH':

            state = {
                search: action.data
            }

            return state

        default:
            return state

    }

}

export default ReducerSearch