const initialState = {
    isLoad: true
}

const ReducerCount = (state = initialState, action) => {

    switch(action.type){
        case 'CHANGE_LOAD':

            state = {
                isLoad: !action.data
            }

            return state
        default:
            return state
    }

}

export default ReducerCount