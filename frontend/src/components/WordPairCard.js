import React from 'react'
import { Typography, Card } from '@mui/material'
import { indigo } from '@mui/material/colors';
import {capitalizeFirstLetter} from "./utilities"
import { useSelector } from 'react-redux';

const WordPairCard = ({setEditMode, ingilizce, turkce, _id, }) => {

  

    const {collection} = useSelector(state=>state.collection)

    const editSwitch = async(e, _id) =>{
        e.preventDefault();
     
       const item = collection.cArray.find(element=>element._id === _id)
       setEditMode(pS=>({...pS, [_id]:{...item}}))
    
    }
  
  
   
  return (
    <Card   className='cardAnime'  onClick={(e)=>editSwitch(e, _id)}  sx={{
        borderRadius:"20px",
        padding:"1rem",
        mx:"10px",
        backgroundColor:collection.color,
        width:"310px",
        opacity:0.6,
        "&:hover":{
        background:indigo[600],
        cursor:"pointer"
    },
    
    }}>
                <Typography sx={{
                    whiteSpace:"normal",
                    maxWidth:"300px",
                    textAlign:"center",
                    wordBreak: "break-all",
                }} 
                fontWeight="fontWeightBold" 
                color="ingilizceRenk"  
                variant='h5' gutterBottom>
                    {capitalizeFirstLetter(ingilizce) }
                </Typography>
                
                <Typography  
                fontWeight="fontWeightBold"  
                sx={{
                wordBreak: "break-all",
                whiteSpace:"normal",
                textAlign:"center",
                minWidth:"300px", 
                }}
                color="turkceRenk" 
                variant='body1'
                gutterBottom>
                    {turkce}
                    
                </Typography>
  </Card>
  )
}

export default WordPairCard