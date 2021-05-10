import axiosClient from './axiosClient'

const NoteAPI = {

    post_note: (data) => {
        const url = `/api/Note`
        return axiosClient.post(url, data)
    },

    get_note: (id) => {
        const url = `/api/Note/${id}`
        return axiosClient.get(url)
    }

}

export default NoteAPI