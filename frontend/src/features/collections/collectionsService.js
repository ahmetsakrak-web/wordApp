import axios from "axios"

import { configBearer, backgroundColors, URL_COLLECTION } from "../../components/utilities"

/* import { mylogout, reset } from '../features/auth/authSlice';
import {useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom";
dispatch(mylogout())
dispatch(reset())
navigate("/login"); */


const fetchCollections = async(token)=>{
   
   

    const {data} = await axios.get(URL_COLLECTION, configBearer(token))

    
        
    
         return data
    
}

const createCollection = async(collectionName, token) => {
   
    const renk = Math.floor(9*Math.random());
    
    const {data} = await axios.post(URL_COLLECTION, {...collectionName, cColor:backgroundColors[renk]}, configBearer(token))
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