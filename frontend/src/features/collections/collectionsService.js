import axios from "axios"

const URL = "/api/collections/"


const fetchCollections = async(token)=>{
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(URL, config)
    return response.data
}

const createCollection = async(cName, token)=>{
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(URL, cName, config)
    return response.data
}

const collectionService = {
    fetchCollections,
    createCollection
}

export default collectionService