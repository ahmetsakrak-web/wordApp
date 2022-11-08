import {configureStore} from "@reduxjs/toolkit";
import authReducer  from "../features/auth/authSlice"
import collectionsReducer  from "../features/collections/collectionsSlice"
import collectionReducer from "../features/collection/collectionSlice"
export const store = configureStore({
    reducer:{
        auth: authReducer,
        collections:collectionsReducer,
        collection:collectionReducer,
    },
})