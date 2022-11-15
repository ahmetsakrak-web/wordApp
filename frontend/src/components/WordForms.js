import React, { useState } from 'react'
import { Typography,Button,TextField,Card,Alert } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { indigo } from '@mui/material/colors';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { configBearer } from './utilities';
import { useDispatch } from 'react-redux';
import { createWord, updateWord } from '../features/collection/collectionSlice';


const AddForm = () => {

  const [{turkce, ingilizce}, setAddForm] = useState({turkce:"", ingilizce:""});

  const dispatch = useDispatch();
  const {collection} = useSelector(state=>state.collection)
  const {user} = useSelector(state=>state.auth)


  const addItem = async(e)=>{
    e.preventDefault();
    if(turkce && ingilizce){
    
      const {data} = await axios.put("/api/collections/"+collection._id, {ingilizce,turkce}, configBearer(user.token))
      
      dispatch(createWord(data))

      setAddForm(pS=>({...pS, ingilizce:"", turkce:""}))
    }
  
   
  }
  

  return (
    <form autoComplete='off' onSubmit={addItem}>
      <Typography variant='h4' color="textSecondary" gutterBottom>
         {collection.cName}
      </Typography>

      <Alert sx={{background:"none",padding:"0px"}} severity="info">Kelimeleri düzenlemek için karta dokun</Alert>

      <TextField  fullWidth required
        onChange={(e)=>setAddForm(pS=>({...pS, ingilizce:e.target.value}))}
        variant='outlined' label="İngilizce" value={ingilizce} sx={{my:1}}/>
        
        <TextField  fullWidth required multiline
        onChange={(e)=>setAddForm(pS=>({...pS, turkce:e.target.value}))} 
        label="Türkçe" value={turkce} variant='outlined' sx={{my:1}}/>
      
        
      <Button type='submit' variant='contained' endIcon={<AddRoundedIcon />}>
        Ekle
      </Button>
    </form>
  )
}

const EditForm =({item, setEditMode}) =>{

  const dispatch = useDispatch();

  const {user} = useSelector(state=>state.auth)
  const {collection} = useSelector(state=>state.collection)

  const editItem = async(e, _id) =>{
    e.preventDefault();

  const {data} = await axios.patch("/api/collections/"+ collection._id + "/"+ _id, {...item}, configBearer(user.token))
  

    dispatch(updateWord(data));

    setEditMode((pS)=>{
      const pSClone = {...pS}
      delete pSClone[_id]
      return pSClone})
}
 

  return <form autoComplete='off' onSubmit={(e)=>editItem(e, item._id)}>
          <Card 
             sx={{  
                    display:'flex',
                    flexDirection:"column",
                    justifyContent:"center",
                    alignItems:"center",
                    borderRadius:"20px",
                    padding:"0.5rem 0.5rem",
                    backgroundColor:indigo[600],
                    width:"310px",                
                 }}>
                  
                  <Typography variant='h6' color="textSecondary" sx={{textAlign:"center"}} gutterBottom>
                      Yeniden Düzenle
                  </Typography>
                
                  <TextField color="primary" required
                    onChange={(e)=>setEditMode(prevState=>{
                      const obj = {...prevState}
                      obj[item._id].ingilizce=e.target.value
                      return obj
                    })}
                    value={item?.ingilizce ?? ""} variant='standard' label="İngilizce"sx={{ my:1}}/>
                    
                  <TextField  required  multiline
                    onChange={(e)=>setEditMode(prevState=>{
                      const obj ={...prevState}
                      obj[item._id].turkce=e.target.value
                      return obj
                    })}
                    variant='standard' label="Türkçe" value={item?.turkce ?? ""} sx={{my:1}} />
          
            
                  <Button type='submit' variant='contained'>
                    Düzenle
                  </Button>
          </Card>
  </form>
}


export  {AddForm, EditForm}