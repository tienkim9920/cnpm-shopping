const initialState = {
    idUser: ''
}

const ReducerSession = (state = initialState, action) => {

    switch(action.type){

        case 'ADD_SESSION':
            
            const stateLogin = [...state.idUser]
            stateLogin.idUser = action.data
            return stateLogin

        case 'DELETE_SESSION':
            console.log("idUser: ", action.data)
            
            const stateLogout = [...state.idUser]
            stateLogout.idUser = action.data
            return stateLogout

        default:
            return state

    }

}

export default ReducerSession