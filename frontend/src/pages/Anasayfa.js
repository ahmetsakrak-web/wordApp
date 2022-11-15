import React,{useState, useEffect} from 'react'
import { Typography, Button, Container, Card, CardContent  } from '@mui/material'
import {Link, useNavigate} from "react-router-dom"

import {useSelector,useDispatch} from "react-redux"
import {getCollections, reset} from "../features/collections/collectionsSlice"

import SettingMenu from "../components/SettingMenu"
import { CollectionsLoader } from '../components/Loaders';
import {CollectionAddButton, CollectionAddModal} from "../components/Modal"





const Anasayfa = () => {


  const [open, setOpen] = useState(false);





  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { user } = useSelector(state=>state.auth)
  const {collections, isLoading,isError,message} = useSelector(state=>state.collections)

  useEffect(()=>{
    if(isError){
      console.log(message);
    }
    if(!user){
      navigate("/login")
    }
    dispatch(getCollections())
   
   
    return ()=>{
      dispatch(reset())
    }
  },[user,navigate,isError,message,dispatch])
  
 




  if(isLoading){
    return <CollectionsLoader/>
  }
  


  return (
    <Container sx={{
                    display:"flex",
                    margin:"20px auto",
                    alignItems:"center",
                    justifyContent:"center",
                    gap:"10px",
                    flexWrap:"wrap"
                  }} 
      maxWidth="lg"
      >
       
      
      {collections.map(i=>{
       

     
        return (
            <Card sx={{
                        backgroundColor:i.color,
                        opacity:0.6,
                        borderRadius:"10px",
                        boxShadow:12,
                        px:"20px",
                        transition:"all .333s ease",
                        position:"relative",
                        "&:hover":{
                        backgroundColor:"secondary.dark",
                  }}}  key={i._id}>

                  <SettingMenu collectionId={i._id} />
                  <Typography sx={{textAlign:"center",p:"1rem", }} variant="h5"> {i.cName}</Typography>
                  <Typography sx={{textAlign:"center",lineHeight:"0px" }} variant="h6"> [{i.cArray.length}]</Typography>
                  <CardContent sx={{textAlign:"center"}}>
                      <Link to={`/edit/${i._id}`} className="cardLink"> <Typography>Düzenle</Typography></Link>
                      <Link to={`/exercise/${i._id}`} className="cardLink"> <Typography>Egzersiz</Typography></Link>
                  </CardContent>

            </Card>
        )
      })}

     <CollectionAddButton setOpen={setOpen} />
     <CollectionAddModal open={open}  setOpen={setOpen}  />


    </Container>
  )
}

export default Anasayfa