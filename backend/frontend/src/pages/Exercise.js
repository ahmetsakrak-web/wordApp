import React, { useState,useEffect } from 'react'

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useParams, useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux"
import {getCollection, rArrayDelete, reset, randomizeArray, addWordToRandomArray} from "../features/collection/collectionSlice"
import { Box, Button, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { ExerciseLoader } from '../components/Loaders';





const Exercise = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { collectionId } = useParams();
  const { user } = useSelector(state=>state.auth)
  const {collection, isError, isLoading, message} = useSelector(state=>state.collection)
  const [word, setWord] = useState("");

  const [error,setError]=useState(false)
  const [success, setSuccess]=useState("")

const flexCenter= { display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}

 

  useEffect(()=>{
 
    if(isError){
      console.log(message);
    }
    if(!user){
      navigate("/login")
    }
    const getData = async()=>{
      const data = await dispatch(getCollection(collectionId))
      await dispatch(randomizeArray(data.payload.cArray)) 
    }
    
   getData();
       
    
      
        
  
 
    
  
   
    return ()=>{
      dispatch(reset())
    }
   
  },[user,navigate,isError,message, dispatch, collectionId])





  if(isLoading || !collection.rArray){
  
    return <ExerciseLoader />
  }
  
  if(collection.cArray.length <= 0){
    return <Container sx={{...flexCenter,mt:"100px"}}>
      <Typography sx={{backgroundColor:collection.cColor.backgroundColor,p:"2rem",fontSize:{xs:"20px",md:"30px"},fontWeight:500}} >
        Lütfen <span style={{color:collection.cColor.color}}>{collection.cName}</span> listesinde kelime olduğuna emin olun
      </Typography>
    </Container>
  }




  const checkHandler =(e)=>{
    e.preventDefault()
    if(collection.rArray[0].length===0){
      console.log("tebrikler tüm kelimeleri bildiniz")
    }
    if(word.trim().toLowerCase() === collection.rArray[0].word.trim().toLowerCase()){
       dispatch(rArrayDelete()) 
        setWord("");
        setError(false)
        setSuccess("success")
    }else{
      setError(true)
      setSuccess("")
      const count = collection.rArray.filter(item=>item._id===collection.rArray[0]._id)
      
      if(count.length < 2){
            dispatch(addWordToRandomArray(collection.rArray[0]))
      }
  
    }
    
  }


  return (
    <Container sx={{...flexCenter, height:"80vh", width:"100vw"}} >



      <Typography color="secondary.dark" 
      sx={{
           
            fontWeight:"500", 
            display:"inline", 
            mb:"1rem",
            fontSize:{xs:"35px",}
        }}> 
      kelime sayısı: {error ? collection.rArray.length - 1 : collection.rArray.length} / {collection.cArray.length}
      </Typography>
   

       {     
          (success && !(collection.rArray.length === 0) && !(collection.rArray.length === collection.cArray.length))
                                          ?  
              <Typography 
              sx={{
                    fontWeight:"600", 
                    color:"green", 
                    textAlign:"center",
                    mb:"1rem", 
                    
                    fontSize:{xs:"25px",}
                }} >
                                  Doğru bildiniz! 
              </Typography> 
                                           : ""
      }
       {              error 
                      ?  
                <>
                <Typography sx={{color:"error.main", fontSize:{xs:"20px",sm:"25px"},mb:"0px", position:"relative"}} > 
                <ErrorOutlineIcon sx={{position:"absolute",left:"-30px",top:{sm:"5px"}}}  />     Kelimeyi yanlış girdiniz. Doğrusu;
                </Typography>
                <Typography sx={{fontSize:"35px",color:"success.dark"}}>{collection.rArray[0].word}</Typography> 
                  
                </>
                  : ""
    }           

     {
        collection.rArray[0] ? (
        <Box 
        sx={{
              ...flexCenter,
              justifyContent:"space-around",
             
              width:{xs:"90%"}, 
              maxHeight:{xs:"55vh"},
              minHeight:{xs:"30vh"},
              borderRadius:"10px",
              p:"20px",
              backgroundColor:collection.cColor.backgroundColor,
              
          }}>
            <Typography sx={{ 
              fontSize:{
                xs:"22px",
                sm:"30px"
              },
              overflowY:"auto",
              p:"10px",
              color:collection.cColor.color,
              width:"100%",
              textAlign:"center",
              borderRadius:"10px",
              fontWeight:"500"}}>{collection.rArray[0].definition}</Typography>
          
              <Box sx={{...flexCenter, width:"100%"}} >
                
                                


                <form autoComplete='off' className='form' onSubmit={checkHandler} >

                <TextField error={error} placeholder='Kelimeyi Giriniz...'  
                    sx={{
                          width:"100%",
                          py:"1rem",
                          input:{fontSize:{xs:"25px",sm:"30px",},
                          textAlign:"center",
                          borderBlockColor:collection.cColor.backgroundColor }
                      }} 
                    variant='standard' name='word'color={success} value={word} onChange={(e)=>setWord(e.target.value)}/>

                <Button sx={{display:"none"}} variant='outlined' type='submit'>Tamam</Button>
                </form>
              </Box>
            
        </Box>
        ) 
        :
        <Typography  
        sx={{
              cursor:"pointer",
              fontWeight:600,
              fontSize:"20px", 
              p:"10px",
              borderRadius:"10px", 
              backgroundColor:collection.cColor.backgroundColor
          }} 
          onClick={()=>dispatch(randomizeArray(collection.cArray))} 
          color="primary.light" fontSize="15px">
          
          Tebrikler! Tüm kelimeleri doğru bilginiz. Tekrar Başlamak için bu yazıya dokununuz.

          </Typography>

     }  
  
          
        


    </Container>
  )
}

export default Exercise