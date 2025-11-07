import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  Userdata: null,
  Userinfo: false,
  Userlocation: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserdata: (state, action) => {
      state.Userdata = action.payload
    },
    setUserinfo: (state, action) => {
      state.Userinfo = action.payload
    },
    setUserlocation:(state, action) => {
      state.Userlocation=action.payload
    }
  },
})

export const { setUserdata, setUserinfo,setUserlocation } = userSlice.actions
export default userSlice.reducer