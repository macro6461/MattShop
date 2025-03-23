// slices/productsSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product, ProductsState } from '../../api/types'
import { fetchProducts } from '../../api/productsApi'

const initialState: ProductsState = {
  products: [],
  selectedProduct: null,
  loading: false,
  productError: null
}

const productsSlice = createSlice({
  name: 'products', // Changed name to 'products' to avoid confusion with the reducer name
  initialState,
  reducers: {
    selectProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductData.pending, (state) => {
        state.loading = true
        state.productError = null
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
      })
      .addCase(fetchProductData.rejected, (state, action) => {
        state.loading = false
        let { code, message } = action.error
        state.productError = {
          code,
          message,
          details: 'Be sure to check that the URL you are requesting is properly constructed.'
        }
      })
  }
})

export const fetchProductData = createAsyncThunk<Product[]>(
  'products/fetchProductData',
  async () => {
    return await fetchProducts()
  }
)

export const { selectProduct, setLoading } = productsSlice.actions
export default productsSlice.reducer
