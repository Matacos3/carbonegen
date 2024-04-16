import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value :{
    mail :"",
    name : "",
    token: null, 
    isConnected : false
  }
};

export const userSlice = createSlice({
  name : "user",
  initialState,
  reducers : {
    login : (state, action)=>{
      state.value.mail = action.payload.mail,
      state.value.token = action.payload.token,
      state.value.name = action.payload.name,
      state.value.isConnected = true
    },
    logout : (state) =>{
      state.value.mail = "",
      state.value.token = null,
      state.value.name = "",
      state.value.isConnected = false
    }
  }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;