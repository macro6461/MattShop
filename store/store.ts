import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import productsReducer, { fetchProductData } from './slices/productsSlice'

const rootReducer = combineReducers({
  authState: authReducer,
  productsState: productsReducer
  // Add other reducers here
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const store = configureStore({
  reducer: rootReducer
})

store.dispatch(fetchProductData())

export default store
