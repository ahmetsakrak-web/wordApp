import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import collectionService  from "./collectionsService"

const initialState ={
    collections:[],
    isError:false,
    isSucces:false,
    isLoading:false,
    message:""
}

export const getCollections = createAsyncThunk("collections/fetch",async(_, thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await collectionService.fetchCollections(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
    
})

export const createCollections = createAsyncThunk("collections/createCName",async(cName,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await collectionService.createCollection(cName, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
    
})




const collectionSlice = createSlice({
    initialState,
    name:"collections",
    reducers:{
        reset:(state)=>initialState,
    },
    extraReducers:(builder)=>{
        builder
            .addCase(getCollections.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(getCollections.fulfilled, (state,action)=>{
                state.isLoading=false
                state.isSucces=true
                state.collections=action.payload
            })
            .addCase(getCollections.rejected,(state,action)=>{
                state.isLoading=false
                state.isError=true
                state.message=action.payload
            })
            .addCase(createCollections.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(createCollections.fulfilled, (state,action)=>{
                state.isLoading=false
                state.isSucces=true
                state.collections.push(action.payload)
            })
            .addCase(createCollections.rejected,(state,action)=>{
                state.isLoading=false
                state.isError=true
                state.message=action.payload
            })
    }

})



export const { reset } =collectionSlice.actions
export default collectionSlice.reducer

