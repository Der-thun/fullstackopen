import axios from 'axios'

const url = 'http://localhost:3001/api/persons'

const getNumbers = () => {
    const request = axios.get(url)
    return request.then(responce => responce.data)
}

const createNumbers = (data) => {
    const request = axios.post(url, data)
    return request.then(responce => responce.data)
}

const updateNumbers = (id, data) => {
    const request = axios.put(`${url}/${id}`, data)
    return request.then(responce => responce.data)
  }

const delNumbers = (id) => {
    return axios.delete(`${url}/${id}`)
}

export default {getNumbers, createNumbers, updateNumbers, delNumbers }
