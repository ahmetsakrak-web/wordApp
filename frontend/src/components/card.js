import React from 'react'
import { Typography,Divider } from '@mui/material'
import { indigo } from '@mui/material/colors';
import {capitalizeFirstLetter} from "../components/utilities"


const Card = ({ingilizce,turkce,editSwitch,id}) => {
   
  return (
    <Divider  onClick={(e)=>editSwitch(e,id)}  sx={{
        border:`5px solid ${indigo[600]}`,
        borderRadius:"20px",
        padding:"0.5rem 0.5rem",
        backgroundColor:indigo[600],
        width:"310px",
        
    }}>
                <Typography sx={{
                    whiteSpace:"normal",
                    maxWidth:"300px",
                    wordBreak: "break-all",
                }} 
                fontWeight="fontWeightBold" 
                color="ingilizceRenk"  
                variant='h5' gutterBottom>
                    {capitalizeFirstLetter(ingilizce) }
                </Typography>
                
                <Typography  
                fontWeight="fontWeightBold"  
                sx={{
                wordBreak: "break-all",
                whiteSpace:"normal",
                textAlign:"center",
                minWidth:"300px", 
                
                }}
                color="turkceRenk" 
                variant='body1'
                gutterBottom>
                    {turkce}
                    
                </Typography>
  </Divider>
  )
}

export default Card