import React from 'react'
import { Typography, Card } from '@mui/material'
import { blue, indigo } from '@mui/material/colors';
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
  console.log(collection.cColor.backgroundColor)
  
  
  return (
    <Card className='cardAnime' onClick={()=>editSwitch( _id)}  sx={{
        borderRadius:"20px",
        position:"relative",
        padding:"1rem",
        backgroundColor:collection.cColor.backgroundColor,
        transition:"all ease-in 300ms ",
        width:{xs:"310px",sm:"400px"},
        "&:hover":{
        background:indigo[600],
        cursor:"pointer"},
        ...(definition.split(" ").length<4 && {display:"flex",flexDirection:"column",textAlign:"center",justifyContent:"center"}),
            
    }}>
        <Clear  onClick={(e)=>deleteWordHandler(e,_id)}  sx={{
            backgroundColor:"white",
            p:"2px",
            color:"black", 
            borderBottomLeftRadius:"50%", 
            position:"absolute",
            right:"0px",
            top:"0px",
            fontSize:'30px',
            transition:"all ease 300ms",
            "&:hover":{
            color:"red",
            backgroundColor:"secondary.light",
            }}} />
                
                <Typography sx={{
                    width:"100%",
                    fontWeight:"600",
                }} 
                fontWeight="fontWeightBold" 
                color={collection.cColor.color}  
                variant='h5' gutterBottom>
                    {capitalizeFirstLetter(word) }
                </Typography>
                
                <Typography  
                fontWeight="fontWeightBold"  
                sx={{
                        ...((
                            collection.cColor.backgroundColor==="#00563B" ||
                            collection.cColor.backgroundColor==="black"   ||
                            collection.cColor.backgroundColor==="#153462"
                            )   && {color:blue[300]}),
                        ...((
                            collection.cColor.backgroundColor==="#500000" ||
                            collection.cColor.backgroundColor==="#333"    ||
                            collection.cColor.backgroundColor==="purple"  ||
                            collection.cColor.backgroundColor==="#495464"
                            )   && {color:blue[600]}),   
                        ...(collection.cColor.backgroundColor==="#ff8c00" && {color:blue[800]}),
                        width:"100%", 
                    }}
                variant='body1'
                gutterBottom>{definition}</Typography>
  </Card>
  )
}

export default WordPairCard