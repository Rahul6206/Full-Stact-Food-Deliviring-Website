import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  Shopdata: null,
  ShopRegister: false,
  ShopItems: [],
}

export const OwnerSlice = createSlice({
  name: 'Owner',
  initialState,
  reducers: {
    setShopdata: (state, action) => {
      state.Shopdata = action.payload
    },
    setShopRegister: (state, action) => {
      state.ShopRegister = action.payload
    },
    setShopItems: (state, action) => {
      state.ShopItems = action.payload
    },
    
  },
})

export const { setShopdata,setShopRegister,setShopItems } = OwnerSlice.actions
export default OwnerSlice.reducer