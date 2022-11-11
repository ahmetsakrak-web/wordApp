import React from 'react'
import { Typography,Button,TextField,Card,Alert } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { indigo } from '@mui/material/colors';
import { useSelector } from 'react-redux';









const AddForm = ({setAddForm, addFormElement:{turkceE, ingilizceE, ingilizce, turkce},handleSubmit }) => {
  const {collection} = useSelector(state=>state.collection)
  return (
    <form  
          autoComplete='off'
          onSubmit={handleSubmit}>
      <Typography 
      variant='h4'
      component="h2"
      color="textSecondary"
      gutterBottom>
         {collection.cName}
      </Typography>
      <Alert sx={{background:"none",padding:"0px"}} severity="info">Kelimeleri düzenlemek için karta dokun</Alert>
      <TextField 
        color="primary"
        onChange={(e)=>setAddForm(pS=>({...pS, ingilizce:e.target.value}))}
        variant='outlined' 
        label="İngilizce"
        value={ingilizce}
        fullWidth
        required
        sx={{
          my:1,input: { color: '#fff' } 
        }}
      
        error={ingilizceE}
        />
        
        <TextField 
        onChange={(e)=>setAddForm(pS=>({...pS, turkce:e.target.value}))}
        variant='outlined' 
        label="Türkçe"
        value={turkce}
        fullWidth
        required
        multiline
        inputProps={{
          style: {
            color:'#fff'
          }
          
        }}
        sx={{
          my:1
        }}
        error={turkceE}
        
        />
      
        
      <Button 
        type='submit'
        variant='contained'
        endIcon={<AddRoundedIcon />}>
        Ekle
      </Button>
    </form>
  )
}

const EditForm =({handleSubmit, item, setEditMode,turkceE,ingilizceE,}) =>{
 
  return <form  
          autoComplete='off'
          onSubmit={handleSubmit}>
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
                  
            <Typography 
            variant='h6'
            component="h2"
            color="textSecondary"
            sx={{textAlign:"center"}}
            gutterBottom>
                Yeniden Düzenle
            </Typography>
           
            <TextField 
              
              color="primary"
              onChange={(e)=>setEditMode(prevState=>{
                const obj = {...prevState}
                obj[item._id].ingilizce=e.target.value
                
                return obj
              })}
              value={item?.ingilizce ?? ""}
              variant='standard' 
              label="İngilizce"
              required
              sx={{
                
                my:1,input: { color: '#fff' } 
              }}
              error={ingilizceE}
              />
              
              <TextField 
               onChange={(e)=>setEditMode(prevState=>{
                const obj ={...prevState}
                obj[item._id].turkce=e.target.value
                return obj
              })}
              variant='standard' 
              label="Türkçe"
              value={item?.turkce ?? ""}
              required
              multiline
              inputProps={{
                style: {
                  color:'#fff'
                }
                
              }}
              sx={{
                my:1,input: { color: 'success.main'} 
              }}
              error={turkceE}
              
              />
    
      
      <Button 
        type='submit'
        variant='contained'>
            Düzenle
    </Button>
    </Card>
  </form>
}


export  {AddForm, EditForm}