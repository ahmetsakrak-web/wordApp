import React,{useState, useEffect} from 'react'
import { Typography, Button, Container, TextField,Box, Modal, Card,CardContent  } from '@mui/material'
import {Link, useNavigate} from "react-router-dom"
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import {useSelector,useDispatch} from "react-redux"
import {getCollections, createCollections, reset} from "../features/collections/collectionsSlice"



const style = {
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
      maxWidth:"900px",
      margin:"20px auto",
      alignItems:"center",
      gap:"20px",
      py:"2rem",
      flexWrap:"wrap"
      }} >

      {collections.map(i=>{
      
        return <Card
          sx={{backgroundColor:"arkaplan",opacity:0.8,borderRadius:"10px",
          transition:"all .333s ease",
          "&:hover":{
            opacity:1
          }}}
         key={i._id}>
       
          <Typography sx={{textAlign:"center",p:"1rem"}} variant="h5"> {i.cName}</Typography>
         
          <CardContent>
            <Link to={`/edit/${i._id}`} className="cardLink"> <Typography>Düzenle</Typography></Link>
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
                  <Box sx={style}>
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