import React, { useState } from 'react'
import { Typography, Button, Box, Modal, TextField, Dialog, DialogTitle, DialogActions, Menu, MenuItem, ListItemIcon, IconButton, Tooltip, ListItem, Alert } from '@mui/material'
import { Widgets, Clear, Edit, AddRounded} from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import { createCollections, deleteCollectionThunk, updateColor, updateName, } from '../features/collections/collectionsSlice';
import { backgroundColors, changeColor, changeName, changePassword } from './utilities';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {toast} from "react-toastify"



const CollectionAddModal = ({addModelOpen, setModals}) => {
  
  const [collectionName, setCollectionName] =useState("");

  const [mysetE, setMysetE] = useState(false);

  const dispatch = useDispatch();


  const submitHandler =async(e)=>{
    e.preventDefault();

    if(collectionName===""){
      setMysetE(true);
    }

    if(collectionName){
      dispatch(createCollections({collectionName}))
      setCollectionName("");
      setModals(pS=>({...pS, addModelOpen:false}))
    }

 



}

    return (
    <Modal 
    
    open={addModelOpen} 
    onClose={()=>setModals(pS=>({...pS, addModelOpen:false}))} 
    aria-labelledby="modal-modal-title" 
    aria-describedby="modal-modal-description">
    <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: {xs:"300px",sm:"500px",md:"800px"},
                bgcolor: 'secondary.main',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
            }}>
      <form autoComplete='off' spellCheck="false" onSubmit={submitHandler}>
            <Typography variant='h4' component="h2" color="textSecondary" gutterBottom>
                Yeni Set
            </Typography>           
            <TextField  onChange={(e)=>setCollectionName(e.target.value)} 
                        variant='outlined' label="Yeni Set Adı" value={collectionName}
                        error={mysetE} fullWidth required 
                        inputProps={{ style: { color:'#fff'}}} sx={{my:1}}/>
            <Button type='submit' variant='contained'>
              <AddRounded />
            </Button>
      </form>
    </Box>
</Modal>
  )
}
const CollectionAddButton =({setModals})=>{
  return <Button sx={{width:"100%"}} variant="contained"  onClick={() => setModals(pS=>({...pS, addModelOpen:true}))}>Yeni Set Ekle</Button>
 }
 
 





const CollectionUpdateModal = ({updateModelOpen, setModals}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state=> state.auth);
  
 
 
  const [collectionName, setCollectionName] = useState("");
  
  const [mysetE, setMysetE] = useState(false);
 
  


 
  const submitHandler = async(e)=>{
    e.preventDefault();
  
    if(collectionName===""){
      setMysetE(true);
    }
    
    if(collectionName){
     
      const data = await changeName(updateModelOpen.collectionId, collectionName, user.token)
      
      dispatch(updateName(data));
      setCollectionName("");
      setModals(pS=>({...pS, updateModelOpen:null}))
    }

 



}

    return (
    <Modal open={updateModelOpen ? true : false} onClose={()=>setModals(pS=>({...pS, updateModelOpen:null}))} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
    <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: {xs:"300px",sm:"500px",md:"800px"},
                bgcolor: 'secondary.main',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
            }}>
      <form autoComplete='off' spellCheck="false" onSubmit={submitHandler}>
            <Typography variant='h4' component="h2" color="textSecondary" gutterBottom>
                Seti Düzenle
            </Typography>           
            <TextField  onChange={(e)=>setCollectionName(e.target.value)} 
                        variant='outlined' label="Seti Düzenle" defaultValue={updateModelOpen?.cName}
                        error={mysetE} fullWidth required 
                        inputProps={{ style: { color:'#fff'}}} sx={{my:1}}/>
            <Button type='submit' variant='contained'>
              <ModeEditIcon />
            </Button>
      </form>
    </Box>
</Modal>
  )
}






const ChangePasswordModal = ({passwordModalOpen, setPasswordModalOpen}) => {
  const [visable, setVisable] = useState(false);
  const {user} = useSelector(state=> state.auth);
  const [{oldPassword, newPassword, newPassword2}, setPasswords] = useState({oldPassword:"",newPassword:"",newPassword2:""});
 




  const submitHandler = async(e)=>{
    e.preventDefault();

    if(!newPassword || !newPassword2 || !oldPassword){
      toast.error("Boş alanları doldurun")
     
    }

    if(newPassword !== newPassword2){
      toast.error("Girilen yeni şifre ve şifre tekrarı birbiriyle eşleşmiyor.")
    }else{
    try {
      const data = await changePassword(oldPassword, newPassword, user.token)
      toast.success(data.message);
      setPasswords({oldPassword:"",newPassword:"",newPassword2:""});
      setPasswordModalOpen(false)
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message)
      
    }
    
 
   
    }
   
}




    return (
    <Modal open={passwordModalOpen} onClose={()=>setPasswordModalOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
    <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: {xs:"300px",sm:"500px",md:"800px"},
                bgcolor: 'secondary.main',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
            }}>
      <form autoComplete='off' spellCheck="false" onSubmit={submitHandler}>
            <Typography variant='h4' component="h2" color="textSecondary" gutterBottom>
                Şifreyi Değiştir
            </Typography>
            <Alert 
            icon={visable  ? <VisibilityOffIcon onClick={()=>setVisable(!visable)} style={{cursor:"pointer"}} /> 
            : <VisibilityIcon onClick={()=>setVisable(!visable)}   style={{cursor:"pointer"}}/>}

            sx={{background:"none"}} severity="info">Şifreyi görmek için soldaki göz ikonuna dokun!</Alert>   
            
              <TextField  onChange={(e)=>setPasswords((pS)=>({...pS, oldPassword:e.target.value}))} 
                          variant='outlined' label="Eski Şifreyi Giriniz." value={oldPassword}
                          fullWidth required type={visable ? "text" : "password"}
                          inputProps={{ style: { color:'#fff'}}} sx={{my:1}}/>
            
            <TextField  onChange={(e)=>setPasswords((pS)=>({...pS, newPassword:e.target.value}))} 
                        variant='outlined' label="Yeni Şifreyi Giriniz" value={newPassword}
                         fullWidth required type={visable ? "text" : "password"}
                        inputProps={{ style: { color:'#fff'}}} sx={{my:1}}/>
            <TextField  onChange={(e)=>setPasswords((pS)=>({...pS, newPassword2:e.target.value}))} 
                        variant='outlined' label="Yeni Şifreyi Tekrar Giriniz" value={newPassword2}
                         fullWidth required type={visable ? "text" : "password"}
                        inputProps={{ style: { color:'#fff'}}} sx={{my:1}}/>                          

            <Button type='submit' variant='contained'>
              <ModeEditIcon />
            </Button>
      </form>
    </Box>
</Modal>
  )
}



const CollectionDeleteModal = ({setModals, confirmModalOpen}) =>{

  const dispatch = useDispatch();

  const deleteCollectionHandle = async()=>{
   
      dispatch(deleteCollectionThunk(confirmModalOpen))
      setModals(pS=>({...pS, confirmModalOpen:null}))
  }

  return (
    <div>
     
      <Dialog
        open={confirmModalOpen ? true : false}
        onClose={()=>setModals(pS=>({...pS, confirmModalOpen:null}))}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Silmek istediğine emin misin?"}
        </DialogTitle>
     
        <DialogActions>
          <Button onClick={()=>setModals(pS=>({...pS, confirmModalOpen:null}))}>Hayır</Button>
          <Button onClick={deleteCollectionHandle} autoFocus>
            Evet
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


const SettingModal = ({setModals, collectionId,cName }) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);



  const {user} = useSelector(state=>state.auth)
  const dispatch = useDispatch();



  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

 

  const colorChange =async(cColor)=>{
     
      try {
       const data = await changeColor(collectionId, cColor, user.token)
        dispatch(updateColor(data));

      } catch (error) {
        console.log(error)
      }
  }





  return (
    <>
      <Box sx={{position:"absolute", cursor:"pointer",right:"0px",top:"0px",}}>
        
        <Tooltip title="Ayarlar">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
             <Widgets fontSize="small"  className="cardLink"/>
          </IconButton>
        </Tooltip>
      </Box>
      
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            backgroundColor:"secondary.dark",
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
    
   
          <MenuItem onClick={()=>setModals(pS=> ({...pS, updateModelOpen:{collectionId, cName}}))}>
            <ListItemIcon>
              <Edit fontSize="small" />
            </ListItemIcon>
            Set ismi
          </MenuItem>

          <MenuItem onClick={()=>setModals(pS=> ({...pS, confirmModalOpen:collectionId}))}>
            <ListItemIcon>
              <Clear fontSize="small" />
            </ListItemIcon>
            Sil
          </MenuItem>

          <ListItem sx={{flexWrap:"wrap", width:"130px"}}>
              {backgroundColors.map(((item,i)=>{
                return <Box key={i+". color"} onClick={()=>colorChange(item)} 
                sx={{
                    width:"20px",
                    height:"20px", 
                    background:item.backgroundColor,
                    m:"5px", 
                    cursor:"pointer",
                    transition:"all 200ms",
                    "&:hover":{transform:"scale(1.3)"}}} />
              }))}
              
          </ListItem>
         
      </Menu>
    </>
  );
}





export  {CollectionAddModal, CollectionDeleteModal, CollectionAddButton, SettingModal, CollectionUpdateModal, ChangePasswordModal}