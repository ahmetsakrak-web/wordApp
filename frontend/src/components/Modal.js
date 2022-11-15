
import { Typography, Button, Box, Modal, TextField,  } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createCollections } from '../features/collections/collectionsSlice';


const CollectionAddModal = ({open, setOpen}) => {
  
  const [collectionName, setCollectionName] =useState("");

  const [mysetE, setMysetE] = useState(false);

  const dispatch = useDispatch();


  const submitHandler =async(e)=>{
    e.preventDefault();

    if(collectionName){

      dispatch(createCollections({collectionName}))
      setCollectionName("");
      setOpen(false)
    }




    if(collectionName===""){
      setMysetE(true);
    }



}

    return (
    <Modal open={open} onClose={()=>setOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
    <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 800,
                bgcolor: 'secondary.main',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
            }}>
      <form autoComplete='off' onSubmit={submitHandler}>
            <Typography variant='h4' component="h2" color="textSecondary" gutterBottom>
                Yeni Set
            </Typography>           
            <TextField  onChange={(e)=>setCollectionName(e.target.value)} 
                        variant='outlined' label="Yeni Set Adı" value={collectionName}
                        error={mysetE} fullWidth required multiline
                        inputProps={{ style: { color:'#fff'}}} sx={{my:1}}/>
            <Button type='submit' variant='contained'>
              <AddRoundedIcon />
            </Button>
      </form>
    </Box>
</Modal>
  )
}

const CollectionAddButton =({setOpen})=>{
 return <Button sx={{width:"100%"}} onClick={() => setOpen(true)}>Yeni Set Ekle</Button>
}


export  {CollectionAddModal, CollectionAddButton }