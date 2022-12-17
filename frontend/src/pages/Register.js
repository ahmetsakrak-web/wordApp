import React,{useEffect, useState} from 'react'
import {Box,Button,TextField, Typography} from "@mui/material"
import {Container } from '@mui/system'
import {useSelector, useDispatch} from "react-redux"
import {Link, useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import { register, reset } from '../features/auth/authSlice'
import { CollectionsLoader } from '../components/Loaders';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const Register = () => {
    const [formData,setFormData] = useState({
            name:"",
            email:"",
            password:"",
            password2:"",
        })

    const { name, email, password, password2 } = formData



        const navigate = useNavigate();
        const dispatch = useDispatch();

        const {user, isLoading, isError, isSuccess, message} = useSelector(state=>state.auth)
        const [visable, setVisable] = useState(false);
        useEffect(()=>{

            if(isError){
                toast.error(message);
            }

            if (isSuccess || user){
                navigate("/")
            }
            
            dispatch(reset())

        },[user, isError, isSuccess, message, navigate, dispatch])

    const onChange =(e)=>{
        setFormData((ps)=>({
            ...ps,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit =(e)=>{
        e.preventDefault();
    
        if(password !== password2){
            toast.error("Şifre Eşleşmedi")
            console.log("hello")
        }else{
            const userData = {
               username:name,
                email,
                password
            }
        dispatch(register(userData))
        }
    }

    if(isLoading){
        return <CollectionsLoader />
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
                  mb:"100px"
                  }}
              onSubmit={onSubmit}
          >
             <Typography  sx={{textAlign:"center",fontSize:"35px", color:"primary.light"}}>
            Word Exercise
           </Typography>


              <TextField  label="İsim" variant="standard" name="name" type="text" value={name} onChange={onChange}
              sx={{
                  mt:"20px",
                  width:"100%",
              }}
              />
                <TextField label="Email" variant="standard"  name='email' type="email" value={email} onChange={onChange}
              sx={{
                  mt:"20px",
                  width:"100%"
              }}
              />

            <div className='sifre'>
             { visable  ? <VisibilityOffIcon onClick={()=>setVisable(!visable)} className='span'/> 
             : <VisibilityIcon onClick={()=>setVisable(!visable)}  className='span'/> }
              <TextField 
               label="Şifre" variant="standard" name='password' type={visable ? "text" : "password"} value={password} onChange={onChange}
            sx={{
                mt:"20px",
                width:"100%"
            }} />
            </div>

           
              <TextField 
               label="Şifreyi tekrar giriniz" variant="standard" name='password2' type={visable ? "text" : "password"} value={password2} onChange={onChange}
            sx={{
                mt:"20px",
                width:"100%"
            }} />
            

              <Button startIcon={<AccountBoxIcon  sx={{fontSize:"60px"}}/>} type='submit' size='small' variant='contained' sx={{mt:"40px", width:"100%"}}>
         
                 Kayıt Ol     
              </Button>
              <Typography sx={{textAlign:"center",fontSize:"18px",color:"white",mt:"10px"}}> Hesabın var mı? 
                <Button sx={{ml:"10px","&:hover":{background:"none"}}} startIcon={<ArrowRightIcon/>}>
                    <Link className='link'  to="/login"> Giriş Yap</Link>
                </Button>
            </Typography>
              </Box>
             
              </Container>
  
    )
  }