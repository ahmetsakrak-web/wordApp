import axios from "axios"
import { configBearer } from "../../components/utilities"


const URL = "/api/collections/"


const fetchCollection = async(Cid, token)=>{
   

    const response = await axios.get(URL+Cid, configBearer(token))

    return response.data
}




const arrayService = {
    fetchCollection
}

export default arrayService