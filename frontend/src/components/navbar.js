import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {Link} from "react-router-dom"
import ListItem from '@mui/material/ListItem';
import {Button, Typography } from '@mui/material';
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








export default function Sidebar(props) {
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
    <Box sx={{ display: 'flex', backgroundColor:"secondary.main" }}>
      
      <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{color:"white",
             backgroundColor:"secondary.light",
              mr: 2, ...(open && { display: 'none' }),
              "&:hover":{
                background:"black"
              }
             }}
          >
            <MenuIcon />
          </IconButton>
         <Typography color="primary.light">Word App</Typography>
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
       
        <DrawerHeader>
           <Typography sx={{textAlign:"center"}}>MENU</Typography> 
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
       
         {/* Links  */}
        {
        user ? (
        <ListItem sx={{display:"flex",flexDirection:"column"}}>
            <Link to={`/anasayfa`} className="navLink"> <Typography>Anasayfa</Typography></Link>
            <Link to={`/`} className="navLink"><Typography>Düzenleme</Typography></Link>
            <Button onClick={onLogout} variant='text'>Çıkış</Button>
         </ListItem> 
         ) :
       (<ListItem sx={{display:"flex",flexDirection:"column"}}>
          <Link to={`/login`} className="navLink"> <Typography>Giriş</Typography></Link>
          <Link to={`/register`} className="navLink"><Typography>Kayıt Ol</Typography></Link>
        </ListItem>) 
        }
         
   
        <Divider />
      </Drawer>
      
    </Box>
  );
}