import axios from 'axios'

const url = 'http://localhost:3001/persons'

const getNumbers = () => {
    const request = axios.get(url)
    return request.then(responce => responce.data)
}

const createNumbers = (data) => {
    const request = axios.post(url, data)
    return request.then(responce => responce.data)
}

export default {getNumbers, createNumbers }
