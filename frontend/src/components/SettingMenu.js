import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


import WidgetsIcon from '@mui/icons-material/Widgets';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { ListItem } from '@mui/material';
import { backgroundColors,configBearer } from './utilities';

import { useDispatch, useSelector } from 'react-redux';
import { updateColor } from '../features/collections/collectionsSlice';

import axios from "axios"


export default function AccountMenu({collectionId}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const {user} =useSelector(state=>state.auth)
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const colorChange =async(e,color)=>{
    e.preventDefault();
   
      try {

        const {data} = await axios.put(`/api/collections/color/${collectionId}`, {color}, configBearer(user.token))

        dispatch(updateColor(data));

      } catch (error) {
        console.log(error)
      }
  }




  return (
    <React.Fragment>
      <Box sx={{position:"absolute", cursor:"pointer",right:"0px",top:"0px",}}>
        
        <Tooltip title="ayarlar">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
             <WidgetsIcon fontSize="small"  className="cardLink"/>
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
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
    
   
        <MenuItem >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Set ismi
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ClearIcon fontSize="small" />
          </ListItemIcon>
          Sil
        </MenuItem>
          <ListItem sx={{flexWrap:"wrap",width:"130px"}}>
            {backgroundColors.map(((item,i)=>{
              return <Box key={i} onClick={(e)=>colorChange(e,item.background)} 
              sx={{
                  width:"20px",
                  height:"20px", 
                  background:item.background,
                  m:"5px", 
                  cursor:"pointer",
                  transition:"all 200ms",
                  "&:hover":{transform:"scale(1.3)"}}} />
            }))}
            
          </ListItem>
         


      </Menu>
    </React.Fragment>
  );
}