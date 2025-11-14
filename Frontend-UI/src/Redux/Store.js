import { configureStore } from '@reduxjs/toolkit'
import userReducer from './UserSlice.js' 
import OwnerReducer from './OwnerSlice.js'
export const store = configureStore({
  reducer: {
    user: userReducer,
    Owner: OwnerReducer

  },
})