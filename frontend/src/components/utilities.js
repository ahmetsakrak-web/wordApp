import axios from "axios";


const URL_COLLECTION = "/api/collections/"
const URL_COLLECTION_COLOR = "/api/collections/color/"

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}



const backgroundColors = [
    {backgroundColor:"#500000", color:"black"},
    {backgroundColor:"black", color:"white"},
    {backgroundColor:"#333", color:"white"},
    {backgroundColor:"#00563B", color:"white"},
    {backgroundColor:"#ff8c00", color:"#333"},
    {backgroundColor:"#153462", color:"white"},
    {backgroundColor:"purple", color:"white"},
    {backgroundColor:"#7B3F00", color:"black"},
    {backgroundColor:"#495464", color:"white"}
]


const configBearer =(token)=> {
      return  {
            headers:{
                Authorization: `Bearer ${token}`
            }
      }
 
}

const addWordPair = async(cId, wordPair, token)=>{
      const {data} = await axios.put(URL_COLLECTION + cId, wordPair, configBearer(token))
      return data
}

const editWordPair = async(cId, wId, wordPair, token)=>{
  const {data} = await axios.patch(URL_COLLECTION + cId + "/"+ wId, wordPair, configBearer(token))

  return data
}

const deleteWordPair = async(cId, wId, token)=>{
  const {data} = await axios.delete(URL_COLLECTION + cId + "/"+ wId, configBearer(token))
  return data
}






const changeColor = async(cId, cColor, token)=>{
  
  const {data} = await axios.put(URL_COLLECTION_COLOR + cId, cColor, configBearer(token))
  return data
}

const changeName = async (cId, collectionName, token) => {
  const {data} = await axios.patch(URL_COLLECTION + cId, {collectionName}, configBearer(token))

  return {cName:data, cId}
}





export {
  capitalizeFirstLetter, 
  backgroundColors, 
  configBearer, 
  URL_COLLECTION, 
  addWordPair, 
  editWordPair,
  changeColor,
  changeName,
  deleteWordPair,
  
}

