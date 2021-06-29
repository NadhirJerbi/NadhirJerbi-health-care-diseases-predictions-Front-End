import axios from 'axios'

const getAPI = axios.create({
    baseURL: 'https://health-care-ml.herokuapp.com',
    timeout: 1000,
})

export {
    getAPI
}