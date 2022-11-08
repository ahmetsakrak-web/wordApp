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
    console.log(response);
    return response.data
}

const arrayService = {
    fetchCollection,
    createWord
}

export default arrayService