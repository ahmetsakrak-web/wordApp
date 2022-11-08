const asyncHandler = require("express-async-handler")
const Collection = require("../models/collectionM")
const User = require("../models/userM")


// ------------------------------------- Collections and Collection GET & DELETE --------------------------

const getCollections = asyncHandler(async(req,res)=>{

    const collections = await Collection.find({user:req.user.id})

    res.json(collections);
});

const getCollection = asyncHandler(async(req,res)=>{

    const collection = await Collection.findById(req.params.id)
    res.json(collection);
});


const removeCollection = asyncHandler(async(req,res)=>{
    const collection =await Collection.findById(req.params.id)
    if (!collection){
        res.status(400)
        throw new Error("collection's not found to delete")
    } 
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401)
        throw new Error("User Not Found");
    }
    if(collection.user.toString() !== user.id){
        res.status(401)
        throw new Error("User Not Found");
    }

    await collection.remove();
    res.status(200).json({id:req.params.id})
})




//------------------------------------------------ Collection Name POST & UPDATE ------------------------------------

const postCollectionName = asyncHandler(async(req,res)=>{
   
    if(!req.body.collectionName){
        throw new Error("You should give a name collection")
    }

    const collection = await Collection.create({
        cName:req.body.collectionName,
        cArray:[],
        user:req.user.id
    })

    res.status(201).json(collection);
});



const updateCollectionName = asyncHandler(async(req,res)=>{

    const collection = await Collection.findById(req.params.id);

    if(!collection){
        res.status(400);
        throw new Error("Collection's not Found");
    }

    if(!req.body.collectionName){
        res.status(400);
        throw new Error("You should enter collection name");
    }

   

    if(collection.user.toString() !== req.user.id){
        res.status(401);
        throw new Error("You're not allowed");
    }



    collection.cName = req.body.collectionName;

    await collection.save();

    res.json(collection.cName);
 
});










//------------------------------------------------ Collection Array POST & UPDATE & DELETE ------------------------------------

const postCollectionArray = asyncHandler(async(req,res)=>{
  
    const collection = await Collection.findById(req.params.id)
  
    if(!req.body.turkce || !req.body.ingilizce){
        res.status(400)
        throw new Error("Parameters are wrong or both of them are empty")
    }
    
    if(!collection){
        res.status(400)
        throw new Error("Collection's not Found")
    }
    

    collection.cArray.push(req.body);

    await collection.save();

    res.status(201).json(req.body);
})



const updateCollectionArray = asyncHandler(async (req,res)=>{
      const collection = await Collection.findById(req.params.id);

      
    if(collection.user.toString() !== req.user.id){
        res.status(401);
        throw new Error("You're not allowed");
    }
      
    const foundIndex = collection.cArray.findIndex(word =>word.id === req.params.word_id);
    
    if(foundIndex === -1) {
        res.status(404)
        throw new Error("There is no item to update.");
    }

    if(!req.body.turkce || !req.body.ingilizce){
        res.status(400);
        throw new Error("Parameters are wrong or both of them are empty");
    }

    collection.cArray[foundIndex] = {...collection.cArray[foundIndex], ...req.body}
    
    await collection.save();

    res.status(201).json(collection);
});



const removeCollectionArray = asyncHandler(async (req,res)=>{
    
        const collection = await Collection.findById(req.params.id);
  
        
      if(collection.user.toString() !== req.user.id){
          res.status(401);
          throw new Error("You're not allowed");
      }
        
      const foundIndex = collection.cArray.findIndex(word =>word.id === req.params.word_id);
    
      if(foundIndex === -1) {
          res.status(404)
          throw new Error("There is no item to delete.");
      }
      collection.cArray.splice(foundIndex,1);

      await collection.save();
      res.json(collection);

  
});



module.exports = {
    getCollections,
    getCollection,
    postCollectionName,
    updateCollectionName,
    postCollectionArray,
    removeCollection,
    updateCollectionArray,
    removeCollectionArray,
    
}