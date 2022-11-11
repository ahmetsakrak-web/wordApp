import React,{useState, useEffect} from 'react'
import { Typography, Button, Container, TextField,Box, Modal, Card, CardContent  } from '@mui/material'
import {Link, useNavigate} from "react-router-dom"
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import {useSelector,useDispatch} from "react-redux"
import {getCollections, createCollections, reset} from "../features/collections/collectionsSlice"
import {backgroundColors} from "../components/utilities"



const styles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'secondary.main',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};




const Anasayfa = () => {

  const [collectionName, setCollectionName] =useState("");
  const [mysetE, setMysetE] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
  
 


  const addsetHandle =async(e)=>{
      e.preventDefault();

      if(collectionName){
        dispatch(createCollections({collectionName}))
        setCollectionName("");
        handleClose()
      }

      if(collectionName===""){
        setMysetE(true);
      }



  }

  if(isLoading){
    return <h2>It's Loading</h2>
  }
 

  return (
    <Container sx={{
      display:"flex",
      margin:"20px auto",
      alignItems:"center",
      justifyContent:{
        xs:"center",
        sm:"left",
       
      },
      gap:"10px",
   
      flexWrap:"wrap"
      }} 
      maxWidth="lg"
      >

      {collections.map(i=>{
      let renk =  Math.floor(Math.random() * 10)
      
        return <Card
                  sx={{
                    backgroundColor:backgroundColors[renk],
                    opacity:0.6,
                    borderRadius:"10px",
                    boxShadow:12,
                    transition:"all .333s ease",
                    "&:hover":{
                      backgroundColor:"secondary.dark",
                    }}}
         key={i._id}>
       
          <Typography sx={{textAlign:"center",p:"1rem", }} variant="h5"> {i.cName}</Typography>
          <Typography sx={{textAlign:"center",lineHeight:"0px" }} variant="h6"> [{i.cArray.length}]</Typography>
          <CardContent sx={{textAlign:"center"}}>
            <Link to={`/edit/${i._id}/${renk}`} className="cardLink"> <Typography>Düzenle</Typography></Link>
            <Link to={`/exercise/${i._id}`} className="cardLink"> <Typography>Egzersiz</Typography></Link>
          </CardContent>
        
         
        
        </Card>
      })}
    
    <Button sx={{width:"100%"}} onClick={handleOpen}>Yeni Set Ekle</Button>

    


 
  
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
       
      >
                  <Box sx={styles}>
                          <form  
                            autoComplete='off'
                            onSubmit={addsetHandle}>
                              <Typography 
                              variant='h4'
                              component="h2"
                              color="textSecondary"
                              gutterBottom>
                                  Yeni Set
                              </Typography>
                              
                              <TextField 
                                onChange={(e)=>setCollectionName(e.target.value)}
                                variant='outlined' 
                                label="Yeni Set Adı"
                                value={collectionName}
                                error={mysetE}
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
                              
                                
                                />
                              
                                
                                <Button 
                                type='submit'
                              variant='contained'
                              >
                                <AddRoundedIcon />
                              </Button>
                      </form>

                  </Box>
      </Modal>


    </Container>
  )
}

export default Anasayfa