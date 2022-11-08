import React,{useEffect, useState} from 'react'
import {Box,Button,TextField, Typography} from "@mui/material"
import { Container } from '@mui/system'
import {toast} from "react-toastify"
import LoginIcon from '@mui/icons-material/Login';
import { login,reset } from '../features/auth/authSlice';
import { useSelector, useDispatch} from "react-redux"
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';


export const Login = () => {
const dispatch = useDispatch();
const navigator = useNavigate();

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
    return <Spinner />
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
                mb:"220px"
                }}
            onSubmit={onSubmit}
        >
           <Typography  sx={{textAlign:"center",fontSize:"25px", color:"primary.light"}}>
                Word App
           </Typography>
            <TextField type="email" id="standard-basic" label="Email" variant="standard" name='email' value={email} onChange={onChange}
            sx={{
                mt:"20px",
                width:"100%",
              
                
            }}
            />
              <TextField id="standard-basic" label="Şifre" variant="standard"  name='password' type="password" value={password} onChange={onChange}
            sx={{
                mt:"50px",
                width:"100%"
            }}
            />
            <Button type="submit" size='small' variant='contained' sx={{mt:"40px", width:"100%"}}>
            <LoginIcon sx={{ fontSize: 25, top:"2px", position:"relative" }} />    Giriş
            </Button>

            </Box>
            </Container>

  )
}



