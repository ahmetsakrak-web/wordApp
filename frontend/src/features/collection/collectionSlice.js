import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import collectionService  from "./collectionService"


const initialState ={
    collection:{},
    isError:false,
    isSucces:false,
    isLoading:false,
    message:""
}

export const getCollection = createAsyncThunk("collection/fetch",async(Cid, thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
       
        return await collectionService.fetchCollection(Cid, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
    
})








const collectionSlice = createSlice({
    initialState,
    name:"collection",
    reducers:{
        reset:(state)=>initialState,
        updateWord:(state,action)=>{
      
        state.collection.cArray[action.payload.foundIndex] = action.payload.wordPair
        
        },
        createWord:(state, action)=>{
            
            state.collection.cArray.unshift(action.payload)
        },
        deleteWord:(state, action)=>{
      
            state.collection.cArray.splice(action.payload.foundIndex, 1);
        },
        rArrayDelete:(state)=>{
            state.collection.rArray.splice(0, 1);
        },
        randomizeArray:(state, action)=>{
            let randomArray=[];
            const cArray= [...action.payload]
            for(let i = 0;i< action.payload.length;i++) {
              const deger = Math.floor(Math.random() * cArray.length)
              randomArray =[...randomArray, cArray[deger]]
              cArray.splice(deger,1)
            }
            state.collection.rArray = randomArray
        },
        addWordToRandomArray:(state, action)=>{
            state.collection.rArray.push(action.payload)
        },
      
    },
    extraReducers:(builder)=>{
        builder
            .addCase(getCollection.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(getCollection.fulfilled, (state,action)=>{
                state.isLoading=false
                state.isSucces=true
                state.collection=action.payload
            })
            .addCase(getCollection.rejected,(state,action)=>{
                state.isLoading=false
                state.isError=true
                state.message=action.payload
            })
    }

})



export const { reset, updateWord, createWord, deleteWord, rArrayDelete, randomizeArray, addWordToRandomArray } = collectionSlice.actions
export default collectionSlice.reducer

