function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }



function numDescending(sozluk){
  if(sozluk){
    return [...sozluk].sort((a,b)=>b.id-a.id)
  }
  else{
    return [{ingilizce:"Loading...",turkce:"Loading..."}]
  }
  
}

export {capitalizeFirstLetter,numDescending}

