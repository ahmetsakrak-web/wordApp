import axios from "axios"
import { configBearer, URL_COLLECTION } from "../../components/utilities"



const fetchCollection = async(Cid, token)=>{
   
    const response = await axios.get(URL_COLLECTION + Cid, configBearer(token))

    return response.data
}




const arrayService = {
    fetchCollection
}

export default arrayService