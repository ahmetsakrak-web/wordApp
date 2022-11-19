import React from 'react'
import { Typography, Card } from '@mui/material'
import { indigo } from '@mui/material/colors';
import {capitalizeFirstLetter, deleteWordPair} from "./utilities"
import { useSelector, useDispatch } from 'react-redux';
import {Clear} from '@mui/icons-material';
import { deleteWord } from '../features/collection/collectionSlice';

const WordPairCard = ({setEditMode, word, definition, _id, }) => {

    const dispatch= useDispatch();

    const {collection} = useSelector(state=>state.collection)
    const {user} = useSelector(state=>state.auth)

    const editSwitch = async(_id) =>{
        
     
       const item = collection.cArray.find(element=>element._id === _id)
       setEditMode(pS=>({...pS, [_id]:{...item}}))
    
    }

    const deleteWordHandler = async(e, _id)=>{
        e.stopPropagation();

        const data = await deleteWordPair(collection._id, _id, user.token)
       dispatch(deleteWord(data)) 
    }
  
  
   
  return (
    <Card   className='cardAnime'  onClick={()=>editSwitch( _id)}  sx={{
        borderRadius:"20px",
        position:"relative",
        padding:"1rem",
        mx:"10px",
        backgroundColor:collection.color,
        width:"310px",
        opacity:0.6,
        "&:hover":{
        background:indigo[600],
        cursor:"pointer"}
            
    }}>
        <Clear  onClick={(e)=>deleteWordHandler(e,_id)}  sx={{
            backgroundColor:"secondary.dark",
            color:"red", 
            borderRadius:"50%", 
            position:"absolute",
            right:"10px",
            top:"10px",
            fontSize:'30px',
            "&:hover":{
            backgroundColor:"secondary.light",
            }}} />
                
                <Typography sx={{
                    whiteSpace:"normal",
                    maxWidth:"300px",
                    textAlign:"center",
                    wordBreak: "break-all",
                }} 
                fontWeight="fontWeightBold" 
                color="kelimeRenk"  
                variant='h5' gutterBottom>
                    {capitalizeFirstLetter(word) }
                </Typography>
                
                <Typography  
                fontWeight="fontWeightBold"  
                sx={{
                wordBreak: "break-all",
                whiteSpace:"normal",
                textAlign:"center",
                minWidth:"300px", 
                }}
                color="aciklamaRenk" 
                variant='body1'
                gutterBottom>
                    {definition}
                    
                </Typography>
  </Card>
  )
}

export default WordPairCard