import axios from "axios";
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    // console.log(request.then(response => response.data))
    return request.then(response => response.data)
}
const create = newObject => {
    // console.log("notes.js");
    const request = axios.post(baseUrl, newObject)
    // console.log(request.then(response => response.data));
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    // console.log(request.then(response => response.data))
    return request.then(response => response.data)
}

const updateNumber = (changedPerson, id) => {
    // console.log("called",changedPerson)
    const request = axios.put(`${baseUrl}/${id}`, changedPerson)
    // console.log("script",request.then(response => response.data))
    return request.then(response => response.data)
}

export default {
    getAll: getAll,
    create: create,
    deletePerson: deletePerson,
    updateNumber: updateNumber
}