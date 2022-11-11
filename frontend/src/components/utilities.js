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

const backgroundColors= {
  1:{background:"red"},
  2:{background:"#333"},
  3:{background:"green"},
  4:{background:"orange"},
  5:{background:"#153462"},
  6:{background:"purple"},
  7:{background:"#D6E4E5"},
  8:{background:"black"},
  9:{background:"brown"},
  0:{background:"pink"},
}

export {capitalizeFirstLetter, backgroundColors}

