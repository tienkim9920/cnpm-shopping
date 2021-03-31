export const addSession = (data) => {

    return {
        type: 'ADD_SESSION',
        data
    }

}

export const deleteSession = (data) => {

    return {
        type: 'DELETE_SESSION',
        data
    }

}