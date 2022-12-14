import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import { mylogout } from "../auth/authSlice"
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
        if(thunkAPI.getState().auth.user?.token){
            const token = thunkAPI.getState().auth.user.token
            const data = await collectionService.fetchCollections(token)
            if(data.message === "Oturumun Süresi Doldu"){
                thunkAPI.dispatch(mylogout())
            }
            return data
        }
        
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
    
})

export const createCollections = createAsyncThunk("collections/createCName", async(collectionName,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await collectionService.createCollection(collectionName, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
    
})

export const deleteCollectionThunk = createAsyncThunk("collections/deleteCollection", async(cId, thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await collectionService.deleteCollection(cId, token)
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
        updateColor:(state,action)=>{
            state.collections[action.payload.foundIndex].cColor = action.payload.cColor
        },
        updateName:(state, action)=>{
            const foundIndex = state.collections.findIndex(collection=>collection._id === action.payload.cId);
            state.collections[foundIndex].cName = action.payload.cName
        }
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
            .addCase(deleteCollectionThunk.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(deleteCollectionThunk.fulfilled, (state,action)=>{
                state.isLoading=false
                state.isSucces=true
                const collections = state.collections.filter(collection => collection._id !== action.payload._id)
                state.collections = collections
            })
            .addCase(deleteCollectionThunk.rejected,(state,action)=>{
                state.isLoading=false
                state.isError=true
                state.message=action.payload
            })
    }

})



export const { reset, updateColor, updateName } =collectionSlice.actions
export default collectionSlice.reducer

