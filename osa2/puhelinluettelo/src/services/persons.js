import axios from 'axios'
const url = '/api/persons'

const getAll = async() => {
  return await axios.get(url)
}

const create = async newObject => {
  return await axios.post(url, newObject)
}

const remove = async id => {
    return await axios.delete(`${url}/${id}`)
}

const update = async (id, updatedObject) => {
    return await axios.put(`${url}/${id}`, updatedObject)
}

export default { getAll, create, remove, update }