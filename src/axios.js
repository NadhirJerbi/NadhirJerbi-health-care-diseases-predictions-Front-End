import axios from 'axios'

const getAPI = axios.create({
    baseURL: 'http://health-care-ml.herokuapp.com/',
    timeout: 1000,
})

export {
    getAPI
}