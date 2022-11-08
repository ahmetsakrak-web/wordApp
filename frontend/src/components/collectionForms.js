import React from 'react'
import { Typography,Button,TextField,Card } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { indigo } from '@mui/material/colors';








const AddForm = ({handleSubmit, setIngilizce, setTurkce,turkceE,ingilizceE,turkce,ingilizce }) => {
  return (
    <form  
          autoComplete='off'
          onSubmit={handleSubmit}>
      <Typography 
      variant='h4'
      component="h2"
      color="textSecondary"
      gutterBottom>
          Yeni Kelime 
      </Typography>
      
      <TextField 
        color="primary"
        onChange={(e)=>setIngilizce(e.target.value)}
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
        onChange={(e)=>setTurkce(e.target.value)}
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
                obj[item.id].ingilizce=e.target.value
                
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
                obj[item.id].turkce=e.target.value
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