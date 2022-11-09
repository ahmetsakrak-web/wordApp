import axios from "axios"

const URL = "/api/collections/"


const fetchCollection = async(Cid, token)=>{
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(URL+Cid, config)

    return response.data
}

const createWord = async(wordPair, id, token)=>{
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(URL+id, wordPair, config)
   
    return response.data
}

const updateWord = async(wordPair, cId, wId, token)=>{
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.patch(URL+ cId + "/"+ wId, wordPair, config)
    
    return response.data
}

const arrayService = {
    fetchCollection,
    createWord,
    updateWord
}

export default arrayService