import React, { useState } from 'react'
import { Typography,Button,TextField,Card,Alert } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { indigo } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import { addWordPair, editWordPair } from './utilities';
import { useDispatch } from 'react-redux';
import { createWord, updateWord } from '../features/collection/collectionSlice';
import { CheckCircleOutline, InfoOutlined } from '@mui/icons-material';


const AddForm = () => {

  const [{word, definition}, setAddForm] = useState({word:"", definition:""});

  const dispatch = useDispatch();
  const {collection} = useSelector(state=>state.collection)
  const {user} = useSelector(state=>state.auth)


  const addItem = async(e)=>{
    e.preventDefault();
    if(word && definition){
    
      
       const data = await addWordPair(collection._id, {definition,word}, user.token);
       
      dispatch(createWord(data))

      setAddForm(pS=>({...pS, definition:"", word:""}))
    }
  
   
  }
  

  return (
    <form  autoComplete='off' spellCheck="false" onSubmit={addItem}>
      <Typography variant='h4' sx={{my:"1.5rem"}} color="textSecondary" gutterBottom>
         {collection.cName}
      </Typography>

    
     <Alert icon={<InfoOutlined sx={{fontSize:{sm:"27px"}}} />} sx={{background:"none",padding:"0px",fontSize:{sm:"20px"}}}  severity="info">
        Kelimeleri düzenlemek için karta dokun
      </Alert>

      
      
      
      
      <Alert icon={<CheckCircleOutline />} sx={{background:"none",padding:"0px",fontSize:{xs:"20px",sm:"20px"}}} severity="success">
        Eklenen  Kelime Sayısı: <Typography fontSize={20} sx={{display:"inline",color:"darkgrey"}}> {collection.cArray?.length}</Typography> 
      </Alert>

      <TextField  fullWidth required
        onChange={(e)=>setAddForm(pS=>({...pS, word:e.target.value}))}
        variant='outlined' label="kelime" value={word} sx={{my:1}}/>
        
        <TextField  fullWidth required multiline
        onChange={(e)=>setAddForm(pS=>({...pS, definition:e.target.value}))} 
        label="açıklama" value={definition} variant='outlined' sx={{my:1}}/>
      
        
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

    const data = await editWordPair(collection._id, _id, {...item}, user.token)
    
    dispatch(updateWord(data));

    setEditMode((pS)=>{
      const pSClone = {...pS}
      delete pSClone[_id]
      return pSClone})
}
 

  return <form autoComplete='off' spellCheck="false" onSubmit={(e)=>editItem(e, item._id)}>
          <Card 
        
             sx={{  position:"relative",
                    display:'flex',
                    flexDirection:"column",
                    justifyContent:"center",
                    alignItems:"center",
                    borderRadius:"20px",
                    padding:"1rem ",
                    backgroundColor:indigo[600],
                    width:{xs:"310px",sm:"400px"},               
                 }}>
                  
                  
                
                  <TextField color="primary" required
                    onChange={(e)=>setEditMode(prevState=>{
                      const obj = {...prevState}
                      obj[item._id].word=e.target.value
                      return obj
                    })}
                    value={item?.word ?? ""} variant='standard' label="İngilizce" sx={{ width:"90%"}}/>
                    
                  <TextField  required  multiline
                    onChange={(e)=>setEditMode(prevState=>{
                      const obj ={...prevState}
                      obj[item._id].definition=e.target.value
                      return obj
                    })}
                    variant='standard' label="Türkçe" value={item?.definition ?? ""} sx={{mt:"10px", width:"90%"}} />
          
                  <Button  sx={{position:"absolute",top:0,p:"0 10px"}} type='submit' variant='contained'>
                    Düzenle
                  </Button>
                  
          </Card>
  </form>
}


export  {AddForm, EditForm}