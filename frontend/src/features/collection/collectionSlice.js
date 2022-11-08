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

export const createWord = createAsyncThunk("collection/createWord", async(bundle, thunkAPI)=>{
    try {
        const [wordPair, id] = bundle
       const token = thunkAPI.getState().auth.user.token
       
       return await collectionService.createWord(wordPair, id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
    
})

export const updateWord = createAsyncThunk("collection/updateWord", async(bundle, thunkAPI)=>{
    try {
        const [wordPair, id] = bundle
       const token = thunkAPI.getState().auth.user.token
       
       return await collectionService.createWord(wordPair, id, token)
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
    },
    extraReducers:(builder)=>{
        builder
            .addCase(getCollection.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(getCollection.fulfilled, (state,action)=>{
                state.isLoading=false
                state.isSucces=true

                action.payload.cArray.forEach(element => {
                    element.id =element._id
                    delete element._id
                });
                
                state.collection=action.payload
             
            })
            .addCase(getCollection.rejected,(state,action)=>{
                state.isLoading=false
                state.isError=true
                state.message=action.payload
            })
            .addCase(createWord.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(createWord.fulfilled, (state,action)=>{
                state.isLoading=false
                state.isSucces=true
                state.collection.cArray.push(action.payload)
            })
            .addCase(createWord.rejected,(state,action)=>{
                state.isLoading=false
                state.isError=true
                state.message=action.payload
            })
    }

})



export const { reset } = collectionSlice.actions
export default collectionSlice.reducer

