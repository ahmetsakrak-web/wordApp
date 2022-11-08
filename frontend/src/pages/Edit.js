import {Container} from '@mui/material'
import React, { useState,useEffect } from 'react'
import {numDescending} from "../components/utilities"
import Card from "../components/card"

import {AddForm,EditForm} from '../components/collectionForms';
import { CSSTransition } from 'react-transition-group';


import { useParams, useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from "react-redux"
import {getCollection, createWord, reset} from "../features/collection/collectionSlice"






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
    const item = collection.cArray.find(element=>element.id===id)
      e.preventDefault();

      //5) Basılan editSwitch kendi id'sini variable alır. Değişken olarakta verileri tutar.
     setEditMode(prevState=>{
      
      return {...prevState,[id]:{...item}}
      
     })
  
  }






   //              KELİME DEĞİŞTİRME 


  const editItem = async(e,id) =>{
    e.preventDefault();
    //9) editMode[id] değiştirilen verileri getirir ve database kaydedilir.
  const item = editMode[id];
  //const res = await axios.put(`http://localhost:8000/sozluk/${id}`,item)
  
  //10) databaseden gelen veriler tekrar react'a aktarılır.
  /* setSozluk(prevState=>{
    const array = [...prevState]
    
    array[prevState.findIndex(e=>e.id===id)] = res.data;

    return array  
  }) */

  //11) {id:{turkce:"deger",ingilizce:"value",deleted:true}} değer eklenir.
    setEditMode(prevState=>{
    const obj = {...prevState}
    obj[id].deleted = true;

    return obj
    })

}








  const kelimeler = numDescending(collection.cArray);
  const addFormElement = { setIngilizce, setTurkce, turkceE, ingilizceE,ingilizce,turkce }
  



if(isLoading){
  return <h2>It's loading</h2>
}


  return (
    <Container sx={{
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      gap:"20px",
      py:"2rem",
      }} >
      


     
      <AddForm {...addFormElement} handleSubmit={addItem}/>
     
    




     
      {
         kelimeler.map((item)=> {
        
          const editElement = { item:editMode[item.id], turkceE, ingilizceE, setEditMode }

           return <div key={item.id+"container"}> 
            {/* 1)editMode'un içinde item.id adlı bir değer yok false gösterir. !False = True olduğu için direkt card'ı gösterir.
                4)editSwitch fonksiyonuna basılır.
                6)editMode[item.id] artık true'dur. False döndürür. False gören VE condition'u Cardı göstermez.
             */}
           {(!editMode[item.id] ) && <Card key={item.id} {...item} editSwitch={editSwitch} />}
           
           <CSSTransition 
            unmountOnExit 
            timeout={300} 
            classNames="alert" 
            /* 3)editMode[item.id]?.deleted içinde item.id adlı bir değer yok false gösterir. !False = True olduğu için sağındaki conditiona atar.
                 conditionda: editMode[item.id] item.id adlı bir değer olmadığı için false dönderir. False olduğu için False dönderir. in devreye girmez.
               7) editMode[item.id].deleted hala falsedir. ! işareti sebebiyle yine true döndürür. Condition'da editMode[item.id] true olduğu için true döndürür.
               12) editMode[item.id].deleted true olur. ve ! işareti sebebiyle false döndürür.
            */
            in={!editMode[item.id]?.deleted && (editMode[item.id] ? true : false)} 
            onExited={()=>setEditMode((prevState)=>{
              const obj = {...prevState}
              //13) false olan in yüzünden id:{} adlı değer burada silinir.
              delete obj[item.id]
              return obj})}> 
                    {/* 8)editElement içinde item adlı editmode[item.id]'de verilerini tutar gösterir. editItem'a tıklanır. */}
                  <EditForm handleSubmit={(e)=>editItem(e,item.id)} {...editElement}  key={item.id + "editform"} /> 

              </CSSTransition>
           
            </div>
          
         })
      
      }
     
    </Container>

  )
}

export default Create