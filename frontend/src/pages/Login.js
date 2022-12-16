import React,{useEffect, useState} from 'react'
import {Box,Button,TextField, Typography} from "@mui/material"
import { Container } from '@mui/system'
import {toast} from "react-toastify"
import LoginIcon from '@mui/icons-material/Login';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { login,reset } from '../features/auth/authSlice';
import { useSelector, useDispatch} from "react-redux"
import { Link, useNavigate } from 'react-router-dom';
import { CollectionsLoader } from '../components/Loaders';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export const Login = () => {
const dispatch = useDispatch();
const navigator = useNavigate();

const [visable, setVisable] = useState(false);

const [formData,setFormData] = useState({
        email:"",
        password:"",
    })

const {user, isLoading, isError, isSuccess, message} =useSelector(state=>state.auth)


const { email, password, } = formData

const onChange =(e)=>{
    setFormData((ps)=>({
        ...ps,
        [e.target.name]: e.target.value
    }))
}

const onSubmit =(e)=>{
    e.preventDefault();
    if(!email && !password){
        toast.error("You must fill emty area")
    }

    dispatch(login(formData));


}

useEffect(()=>{
    //databaseden gelen errorlar için
    if(isError){
        toast.error(message)
    }
    //işlem başarılıysa yönlendirmesi için
    if(isSuccess || user){
        navigator("/");
    }
    // isError, isSucess, isLoading, message alanlarını temizler
    // user alanı kalır.
    dispatch(reset())

},[user, isError, isSuccess, message, navigator, dispatch])

if(isLoading){
    return  <CollectionsLoader />
}


  return (
  

        <Container
        sx={{
            height:"100vh",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            }}
        >

        
            <Box
            component="form"
            
            autoComplete="off"
            sx={{
                width:"350px",
                mb:"200px"
                }}
            onSubmit={onSubmit}
        >
           <Typography  sx={{textAlign:"center",fontSize:"35px", color:"primary.light"}}>
            Word Exercise
           </Typography>
            <TextField type="email"  label="Email" variant="standard" name='email' value={email} onChange={onChange}
            sx={{
                mt:"20px",
                width:"100%",
              
                
            }}
            />
            <div className='sifre' style={{marginTop:"50px"}}>
             { visable  ? <VisibilityOffIcon onClick={()=>setVisable(!visable)}  className='span'  /> 
             : <VisibilityIcon onClick={()=>setVisable(!visable)}  className='span'/> }
              <TextField 
               label="Şifre" variant="standard" name='password' type={visable ? "text" : "password"} value={password} onChange={onChange}
            sx={{
                
                width:"100%"
            }}
            />
            </div>
            <Button  startIcon={<LoginIcon fontSize='25px' />} type="submit" size='small' variant='contained' sx={{mt:"40px", width:"100%"}}>
              Giriş
            </Button>
            <Typography sx={{textAlign:"center",fontSize:"18px",color:"white",mt:"10px"}}> Hesabın Yok mu? 
                <Button sx={{ml:"10px","&:hover":{background:"none"}}}  startIcon={<ArrowRightIcon/>}>
                    <Link className='link'  to="/register"> Kayıt Ol</Link>
                </Button>
            </Typography>
            </Box>
            </Container>

  )
}



