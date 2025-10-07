import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type {
  ProductType,
  CreateProductTypeData,
  UpdateProductTypeData,
} from '../types/ProductType'
import { ProductTypeService } from '../services/ProductTypeService'

interface ProductTypesState {
  items: ProductType[]
  loading: boolean
  error: string | null
}

const initialState: ProductTypesState = {
  items: [],
  loading: false,
  error: null,
}

export const fetchProductTypes = createAsyncThunk('productTypes/fetchAll', async () => {
  return await ProductTypeService.getAllProductTypes()
})

export const createProductType = createAsyncThunk(
  'productTypes/create',
  async (data: CreateProductTypeData) => {
    return await ProductTypeService.createProductType(data)
  }
)

export const updateProductType = createAsyncThunk(
  'productTypes/update',
  async ({ id, data }: { id: string; data: UpdateProductTypeData }) => {
    return await ProductTypeService.updateProductType(id, data)
  }
)

export const deleteProductType = createAsyncThunk('productTypes/delete', async (id: string) => {
  await ProductTypeService.deleteProductType(id)
  return id
})

const productTypesSlice = createSlice({
  name: 'productTypes',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProductTypes.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductTypes.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchProductTypes.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch product types'
      })
      .addCase(createProductType.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(createProductType.fulfilled, (state, action) => {
        state.loading = false
        state.items.push(action.payload)
      })
      .addCase(createProductType.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to create product type'
      })
      .addCase(updateProductType.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(updateProductType.fulfilled, (state, action) => {
        state.loading = false
        const index = state.items.findIndex(item => item.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      .addCase(updateProductType.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to update product type'
      })
      .addCase(deleteProductType.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteProductType.fulfilled, (state, action) => {
        state.loading = false
        state.items = state.items.filter(item => item.id !== action.payload)
      })
      .addCase(deleteProductType.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to delete product type'
      })
  },
})

export const { clearError } = productTypesSlice.actions
export default productTypesSlice.reducer
