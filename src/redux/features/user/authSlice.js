/* eslint-disable no-unused-vars */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService';
import {toast} from 'react-toastify'



const initialState = {
    user : "",
    isError :false,
    isLoading : false,
    isSuccess : false,
    message : "",

};

export const registerUser = createAsyncThunk("auth/register", async(userData,thunkAPI)=>{
    try {
        return await authService.register(userData);
    } catch (error) {
       return thunkAPI.rejectWithValue(error);
        
    }
})

export const authSlice = createSlice({
    name :"auth",
    initialState,
    reducers :{},
    extraReducers :(builder)=>{
        builder
        .addCase(registerUser.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(registerUser.fulfilled,(state, action)=>{
            state.isLoading=false;
            state.isSuccess = true;
            state.createdUser = action.payload;
            state.isError = false;
            if(state.isSuccess === true){
                toast.info("User Created Successfully")
            }

        })
        .addCase(registerUser.rejected,(state, action)=>{
            state.isLoading=false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
            if(state.isError === true){
                toast.error(action.error)
            }
        })
    },
})

export default authSlice.reducer