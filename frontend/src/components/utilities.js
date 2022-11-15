function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


/* 
function numDescending(sozluk){
  console.log(sozluk)
  if(sozluk){
    return [...sozluk].sort((a,b)=>b.id-a.id)
  }
  else{
    return [{ingilizce:"Loading...",turkce:"Loading..."}]
  }
  
} */

const backgroundColors= [
    {background:"red"},
    {background:"black"},
    {background:"#333"},
    {background:"green"},
    {background:"orange"},
    {background:"#153462"},
    {background:"purple"},
    {background:"brown"},
    {background:"#c54c82"}
]

const configBearer =(token)=> {
      return  {
            headers:{
                Authorization: `Bearer ${token}`
            }
      }
 
}

export {capitalizeFirstLetter, backgroundColors,configBearer}

