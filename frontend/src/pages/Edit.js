import {Container} from '@mui/material'
import React, { useState,useEffect } from 'react'
import {numDescending} from "../components/utilities"
import Card from "../components/card"

import {AddForm,EditForm} from '../components/collectionForms';
import { CSSTransition } from 'react-transition-group';


import { useParams, useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from "react-redux"
import {getCollection, createWord,updateWord, reset,} from "../features/collection/collectionSlice"






const Create = () => {


  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { user } = useSelector(state=>state.auth)
  const {collection, isError, isLoading, message} = useSelector(state=>state.collection)
  

 
  const [turkce, setTurkce] = useState("");
  const [ingilizce, setIngilizce] = useState("");
  const [turkceE, setTurkceE] = useState(false);
  const [ingilizceE, setIngilizceE] = useState(false);
  const [editMode, setEditMode] = useState({});
  
  

  useEffect(()=>{
 
    if(isError){
      console.log(message);
    }
    if(!user){
      navigate("/login")
    }

    dispatch(getCollection(id))

   
    return ()=>{
      dispatch(reset())
    }
   
  },[user,navigate,isError,message,dispatch])
  




   //              KELİME EKLEME -------------------------------------------------------------------------

  const addItem = async(e)=>{
    e.preventDefault();
    if(turkce && ingilizce){
      setIngilizceE(false);
      setTurkceE(false);
      const bundle = [{ingilizce,turkce},id] 

      dispatch(createWord(bundle))

   

     setIngilizce("");
     setTurkce("");
    
    }
    if(turkce === ""){
      setTurkceE(true);
    }
    if(ingilizce === ""){
      setIngilizceE(true);
    }
   
  }






   //         DÜZENLEME MODUNA ÇEVİRME -------------------------------------------------------------------------

  const editSwitch = async(e,id) =>{
      e.preventDefault();

      const item = collection.cArray.find(element=>element.id===id)
     setEditMode(prevState=>({...prevState,[id]:{...item}}))
  
  }






   //              KELİME DEĞİŞTİRME 


  const editItem = async(e,id) =>{
        e.preventDefault();

        const bundle = {wordPair:editMode[id], cId:collection._id,wId:id}
        dispatch(updateWord(bundle));

        setEditMode((prevState)=>{
          const obj = {...prevState}
          delete obj[id]
          return obj})
  }








 

  const addFormElement = { setIngilizce, setTurkce, turkceE, ingilizceE, ingilizce, turkce }
  


if(isLoading || !collection.cArray){
  return <h2>It's loading</h2>
}

else{

  return (
    <Container sx={{
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      gap:"20px",
      py:"2rem",
      }} >

      <AddForm {...addFormElement} handleSubmit={addItem}/>
    
      {collection.cArray.map((item)=> {
          const editElement = { item:editMode[item.id], turkceE, ingilizceE, setEditMode }

           return <div key={item.id+"container"}> 
                    
                      {(!editMode[item.id] ) && <Card key={item.id} {...item} editSwitch={editSwitch} />}
                      
                      <CSSTransition 
                        unmountOnExit 
                        timeout={300} 
                        classNames="alert"
                        in={editMode[item.id] ? true : false}> 

                            <EditForm handleSubmit={(e)=>editItem(e,item.id)} {...editElement}  key={item.id + "editform"} /> 

                        </CSSTransition>
        
                  </div>
          
         })
      
      }
     
    </Container>

  )

}


  


}

export default Create