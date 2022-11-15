import axios from "axios"
import { configBearer, backgroundColors } from "../../components/utilities"


const URL = "/api/collections/"


const fetchCollections = async(token)=>{
   
    const response = await axios.get(URL, configBearer(token))
    return response.data
}

const createCollection = async(collectionName, token)=>{
    const renk = Math.floor(10*Math.random());
    const response = await axios.post(URL, {...collectionName, color:backgroundColors[renk].background}, configBearer(token))
    return response.data
}



const collectionService = {
    fetchCollections,
    createCollection
}

export default collectionService