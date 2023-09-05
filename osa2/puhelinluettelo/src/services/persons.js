import axios from 'axios'
const url = '/api/persons'

const getAll = () => {
  return axios.get(url)
}

const create = newObject => {
  return axios.post(url, newObject)
}

const remove = id => {
    return axios.delete(`${url}/${id}`)
}

const update = (id, updatedObject) => {
    return axios.put(`${url}/${id}`, updatedObject)
}

export default { getAll, create, remove, update }