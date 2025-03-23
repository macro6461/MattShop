// yourReducer.js
import { loginUser, getProfileData } from '@/api/authApi'
import { AuthState, ProfileProps } from '@/api/types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: AuthState = {
  profile: null,
  loggedIn: false,
  userError: null,
  loading: false,
  pendingProductRedirect: null
}

const authSlice = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    getProfileData: (state, action) => {
      return {
        ...state,
        profile: action.payload
      }
    },
    setPendingProductRedirect: (state, action: PayloadAction<number | null>) => {
      state.pendingProductRedirect = action.payload
    },
    handleLogOut: (state) => {
      return {
        ...state,
        profile: null,
        loggedIn: false
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.userError = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLoginUser.pending, (state) => {
        state.loading = true
        state.userError = null
      })
      .addCase(handleLoginUser.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload
        state.loggedIn = true
      })
      .addCase(handleLoginUser.rejected, (state, action) => {
        state.loading = false
        let { code, message } = action.error
        state.userError = { code: code ?? 403, message }
      })
      .addCase(handleGetProfile.pending, (state) => {
        state.loading = true
        state.userError = null
      })
      .addCase(handleGetProfile.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload
        state.loggedIn = true
      })
      .addCase(handleGetProfile.rejected, (state, action) => {
        state.loading = false
        let { code, message } = action.error
        state.userError = { code, message }
      })
  }
})

export const handleLoginUser = createAsyncThunk<
  ProfileProps | null, // Return type
  { username: string; password: string } // Argument type
>('products/handleLogInUser', async ({ username, password }) => {
  return await loginUser(username, password)
})

export const handleGetProfile = createAsyncThunk<
  ProfileProps | null, // Return type
  { userId: string } // Argument type
>('products/handleGetProfile', async (userid) => {
  return await getProfileData(userid.userId)
})

export const { setLoading, setError, handleLogOut, setPendingProductRedirect } = authSlice.actions
export default authSlice.reducer
