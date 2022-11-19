import axios from "axios"
import { configBearer, backgroundColors, URL_COLLECTION } from "../../components/utilities"





const fetchCollections = async(token)=>{
   
    const {data} = await axios.get(URL_COLLECTION, configBearer(token))
    return data
}

const createCollection = async(collectionName, token)=>{
    const renk = Math.floor(10*Math.random());
    const {data} = await axios.post(URL_COLLECTION, {...collectionName, color:backgroundColors[renk].background}, configBearer(token))
    return data
}

const deleteCollection = async(cId, token)=>{
   const {data} = await axios.delete(URL_COLLECTION + cId, configBearer(token))
    return data
}

const collectionService = {
    fetchCollections,
    createCollection,
    deleteCollection
}

export default collectionService