import axios from "axios";


const URL_COLLECTION = "/api/collections/"
const URL_COLLECTION_COLOR = "/api/collections/color/"

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}



const backgroundColors= [
    {background:"#990000"},
    {background:"black"},
    {background:"#333"},
    {background:"#00563B"},
    {background:"#ff8c00"},
    {background:"#153462"},
    {background:"purple"},
    {background:"#7B3F00"},
    {background:"#495464"}
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






const changeColor = async(cId, color, token)=>{
  const {data} = await axios.put(URL_COLLECTION_COLOR + cId, {color}, configBearer(token))
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

