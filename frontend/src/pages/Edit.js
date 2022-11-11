import React, { useState,useEffect } from 'react'

import {Box, Container} from '@mui/material'

import WordPairCard from "../components/WordPairCard"
import {AddForm, EditForm} from '../components/EditAndAddForms';

import { CSSTransition } from 'react-transition-group';

import { useParams, useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux"
import {getCollection, createWord, updateWord, reset} from "../features/collection/collectionSlice"

import axios from "axios"




const Create = () => {


  const { collectionId, renk } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { user } = useSelector(state=>state.auth)
  const {collection, isError, isLoading, message} = useSelector(state=>state.collection)
  

  const [{turkce,ingilizce,ingilizceE,turkceE}, setAddForm] = useState({turkce:"", ingilizce:"", ingilizceE:false, turkceE:false});

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
   
  },[user,navigate,isError,message,dispatch, collectionId])
  




   //              KELİME EKLEME -------------------------------------------------------------------------

  const addItem = async(e)=>{
    e.preventDefault();
    if(turkce && ingilizce){
      setAddForm(pS=>({...pS, ingilizceE:false, turkceE:false}))
      const bundle = [{ingilizce,turkce},collectionId] 
      dispatch(createWord(bundle))
      setAddForm(pS=>({...pS, ingilizce:"", turkce:""}))
    }
    if(turkce === ""){
      setAddForm(pS=>({...pS, turkceE:false}))
    }
    if(ingilizce === ""){
      setAddForm(pS=>({...pS, ingilizceE:false}))
    }
   
  }






   //         DÜZENLEME MODUNA ÇEVİRME -------------------------------------------------------------------------

  const editSwitch = async(e,_id) =>{
      e.preventDefault();
      console.log(_id)
      const item = collection.cArray.find(element=>element._id===_id)
     setEditMode(pS=>({...pS,[_id]:{...item}}))
  
  }






   //              KELİME DEĞİŞTİRME 


  const editItem = async(e,_id) =>{
        e.preventDefault();

        const config = {
          headers:{
              Authorization: `Bearer ${user.token}`
          }
        }
        console.log(editMode);
      const {data} = await axios.patch("/api/collections/"+ collectionId + "/"+ _id, {...editMode[_id]}, config)
      

        dispatch(updateWord(data));

        setEditMode((pS)=>{
          const pSClone = {...pS}
          delete pSClone[_id]
          return pSClone})
  }

 






 

 
  


if(isLoading || !collection.cArray){
  return <h2>It's loading</h2>
}

else{

  return (
    <Container maxWidth="md" >

      <AddForm 
      setAddForm={setAddForm} 
      addFormElement={{ turkceE, ingilizceE, ingilizce, turkce }} 
      handleSubmit={addItem}/>
    
      {collection.cArray.map((item)=> {
          const editElement = { item:editMode[item._id], turkceE, ingilizceE, setEditMode, }

           return <Box sx={{
                            display:"flex",
                            flexDirection:"column-reverse",
                            justifyContent:"center",
                            alignItems:"center",
                            my:"1rem",
                        
                          }} 
                          key={item._id+"container"}> 
                    
                      {(!editMode[item._id] ) && <WordPairCard key={item._id}  {...item} renk={renk} editSwitch={editSwitch} />}
                                                            
                      <CSSTransition 
                        unmountOnExit 
                        timeout={300} 
                        classNames="edit"
                        in={(editMode[item._id] || editMode[item._id] )? true : false}> 
                        
                            <EditForm handleSubmit={(e)=>editItem(e,item._id) } {...editElement}  key={item._id + "editform"} /> 

                        </CSSTransition>
        
                  </Box>
          
         })
      
      }
     
    </Container>

  )

}


  


}

export default Create