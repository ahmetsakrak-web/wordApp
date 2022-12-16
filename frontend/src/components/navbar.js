import * as React from 'react';

import { styled, useTheme } from '@mui/material/styles';
import {ListItemButton, ListItemIcon, ListItemText, Typography,Box,Drawer,Toolbar,Divider, IconButton,ListItem } from '@mui/material';
import {Menu, ChevronLeft, ChevronRight, Home, ExitToApp,Key, Group, Login} from "@mui/icons-material";

import {Link} from "react-router-dom"

import { mylogout, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';


const drawerWidth = 255;





const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  background:"#330e62"
}));


const passwordHandle =()=>{
  console.log("clicked");
}





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
  if(user){
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
  
              <Menu />
  
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
                    {user.username}
                    </Typography>
            </ListItem>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </DrawerHeader>
          <Divider />
         
           {/* Links  */}
         
            <>
            <ListItem>
              <ListItemButton>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
                <Link to={`/`} className="navLink"><ListItemText>Anasayfa</ListItemText></Link>
              </ListItemButton>
            </ListItem> 
  
            <ListItem>
              <ListItemButton onClick={passwordHandle}>
              <ListItemIcon>
                <Key />
              </ListItemIcon>
                <ListItemText>Şifreni Değiştir</ListItemText>
              </ListItemButton>
            </ListItem> 
  
            <ListItem onClick={onLogout}>
                <ListItemButton>
                  <ListItemIcon>
                    <ExitToApp />
                  </ListItemIcon>
                    <Typography >
                      Çıkış
                    </Typography>
                </ListItemButton>
            </ListItem>
  
            </>
         
           
     
         
        </Drawer>
        
      </Box>
    );

   
  }  
 
}