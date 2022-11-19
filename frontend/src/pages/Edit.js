import React, { useState,useEffect } from 'react'
import { WordPairLoader } from '../components/Loaders';

import {Box, Container} from '@mui/material'

import WordPairCard from "../components/WordPairCard"
import {AddForm, EditForm} from '../components/WordForms';

import { CSSTransition } from 'react-transition-group';

import { useParams, useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux"
import {getCollection, reset} from "../features/collection/collectionSlice"





const Create = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { collectionId } = useParams();
  const { user } = useSelector(state=>state.auth)
  const {collection, isError, isLoading, message} = useSelector(state=>state.collection)
  
  const [editMode, setEditMode] = useState({});
  

  

  useEffect(()=>{
 
    if(isError){
      console.log(message);
    }
    if(!user){
      navigate("/login")
    }
    
    dispatch(getCollection(collectionId))

   
    return ()=>{
      dispatch(reset())
    }
   
  },[user,navigate,isError,message, dispatch, collectionId])
  



  return (
    <Container maxWidth="md" >
     
        <AddForm />
    
      {
        (isLoading || !collection.cArray) 
                ? 
        (<WordPairLoader/>)
                :
      
        (
          collection.cArray.map((wordPair)=> {
       
  
            
                return <Box sx={{
                  display:"flex", 
                  flexDirection:"column", 
                  justifyContent:"center", 
                  alignItems:"center", 
                  my:"1rem"
                  }} key={wordPair._id + "container"}> 
                          
                            {(!editMode[wordPair._id] ) && <WordPairCard setEditMode={setEditMode} key={wordPair._id}  {...wordPair}  />}
                                                                  
                            <CSSTransition unmountOnExit timeout={400} classNames="edit"
                              in={(editMode[wordPair._id] || editMode[wordPair._id] ) ? true : false}> 
                              
                                <EditForm item={editMode[wordPair._id]} setEditMode={setEditMode} key={wordPair._id + "editform"} /> 

                            </CSSTransition>
              
                        </Box>
          })
        )
      }
    
    </Container>

  )

}


  




export default Create