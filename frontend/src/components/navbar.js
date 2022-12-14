import * as React from 'react';

import { styled, useTheme } from '@mui/material/styles';


import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import GroupIcon from '@mui/icons-material/Group';
import LoginIcon from '@mui/icons-material/Login';
import {Link} from "react-router-dom"

import {ListItemButton, ListItemIcon, ListItemText, Typography,Box,Drawer,Toolbar,Divider, IconButton,ListItem } from '@mui/material';

import { mylogout, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';


const drawerWidth = 240;





const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  background:"#330e62"
}));








export const  Navbar=()=> {
  
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector(state=> state.auth)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
 
  const onLogout =(e)=>{
    e.preventDefault();
    dispatch(mylogout())
    dispatch(reset())
    navigate("/login");
    
  }

  return (
    <Box sx={{  backgroundColor:"secondary.main", display:"flex", alignItems:"center"}}>
      
      <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{color:"white",
             backgroundColor:"secondary.light",
              mr: 2, ...(open && { display: 'none' }),
              "&:hover":{
                background:"black"}}}>

            <MenuIcon />

          </IconButton>
          
          <Typography sx={{display:"flex",alignItems:"center",position:"absolute",width:"115px",left:{xs:"60px",sm:"100px"}}}>
            <Link to={`/`} className="link">Word Exercise</Link>
          </Typography>

        </Toolbar>
             
    
       
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor:"secondary.main",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
       
        <DrawerHeader sx={{backgroundColor:"secondary.main"}} >
            <ListItem>
                  <Typography>
                  {user ? user.username :"MENÜ"}
                  </Typography>
          </ListItem>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
       
         {/* Links  */}
        {
        user ? (
          <>
          <ListItem>
            <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
              <Link to={`/`} className="navLink"><ListItemText>Anasayfa</ListItemText></Link>
            </ListItemButton>
          </ListItem> 

          <ListItem onClick={onLogout}>
              <ListItemButton>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                  <Typography >
                    Çıkış
                  </Typography>
              </ListItemButton>
          </ListItem>

          </>
         ) :
       (<>
          
          <ListItem>
          <Link to={`/login`} className="navLink">
            <ListItemButton xs={{width:"100%"}}>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
              <ListItemText>Giriş</ListItemText>
            </ListItemButton>
            </Link>
          </ListItem> 

          <ListItem>
          <Link to={`/register`} className="navLink">
            <ListItemButton>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
              <ListItemText>Kayıt Ol</ListItemText>
            </ListItemButton>
            </Link>
          </ListItem> 
        </>) 
        }
         
   
       
      </Drawer>
      
    </Box>
  );
}