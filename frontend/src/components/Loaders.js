import { Skeleton, Container, Box } from "@mui/material"


const WordPairLoader = () => {
  return (
    <Box sx={{
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center",
      my:"1rem",
      gap:"20px"
  
    }}>  
     <Skeleton variant="rectangular" width={342} height={112} />
     <Skeleton  variant="rectangular" width={342} height={112} />
     <Skeleton  variant="rectangular" width={342} height={112} />
     <Skeleton   variant="rectangular" width={342} height={112} />
    </Box>
  )
}





const CollectionsLoader = ()=>{
 return <Container sx={{
          display:"flex",
          margin:"20px auto",
          alignItems:"center",
          
          justifyContent:"center",
          gap:"10px",

          flexWrap:"wrap"
          }} >
        <Skeleton variant="rounded" width={200} height={170} />
        <Skeleton variant="rounded" width={200} height={170} />
        <Skeleton variant="rounded" width={200} height={170} />
        <Skeleton variant="rounded" width={300} height={170} />
        <Skeleton variant="rounded" width={320} height={166} />
        <Skeleton variant="rounded" width={150} height={170} />
        <Skeleton variant="rounded" width={170} height={170} />
        <Skeleton variant="rounded" width={150} height={170} />
        <Skeleton variant="rounded" width={320} height={166} />
        <Skeleton variant="rounded" width={250} height={170} />
        <Skeleton variant="rounded" width={200} height={170} />
        <Skeleton variant="rounded" width={200} height={170} />
        <Skeleton variant="rounded" width={150} height={170} />
</Container>
}


const ExerciseLoader =()=>{
  return  <Container sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", height:"80vh", width:"100vw"}} >
     <Skeleton variant="text" sx={{ fontSize: "35px",mb:"1rem" }} width={299} height={60}   animation="wave" />
     <Skeleton variant="rounded" width={918} height={283} />
  </Container>
}


export  {WordPairLoader, CollectionsLoader,ExerciseLoader}