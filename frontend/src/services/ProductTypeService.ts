import type {
  ProductType,
  CreateProductTypeData,
  UpdateProductTypeData,
} from '../types/ProductType'
import { mockProductTypes } from './mockData'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081'
const IS_DEVELOPMENT = import.meta.env.DEV

const mockData = [...mockProductTypes]

export class ProductTypeService {
  static async getAllProductTypes(): Promise<ProductType[]> {
    if (IS_DEVELOPMENT) {
      const response = await fetch(`${API_BASE_URL}/productTypes`)
      if (!response.ok) {
        throw new Error('Failed to fetch product types')
      }
      return response.json()
    }

    return Promise.resolve([...mockData])
  }

  static async getProductTypeById(id: string): Promise<ProductType> {
    if (IS_DEVELOPMENT) {
      const response = await fetch(`${API_BASE_URL}/productTypes/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch product type')
      }
      return response.json()
    }

    const product = mockData.find(p => p.id === id)
    if (!product) {
      throw new Error('Product type not found')
    }
    return Promise.resolve(product)
  }

  static async createProductType(data: CreateProductTypeData): Promise<ProductType> {
    if (IS_DEVELOPMENT) {
      const response = await fetch(`${API_BASE_URL}/productTypes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error('Failed to create product type')
      }
      return response.json()
    }

    const newProduct: ProductType = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    }
    mockData.push(newProduct)
    return Promise.resolve(newProduct)
  }

  static async updateProductType(id: string, data: UpdateProductTypeData): Promise<ProductType> {
    if (IS_DEVELOPMENT) {
      const response = await fetch(`${API_BASE_URL}/productTypes/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error('Failed to update product type')
      }
      return response.json()
    }

    const index = mockData.findIndex(p => p.id === id)
    if (index === -1) {
      throw new Error('Product type not found')
    }
    mockData[index] = { ...mockData[index], ...data }
    return Promise.resolve(mockData[index])
  }

  static async deleteProductType(id: string): Promise<void> {
    if (IS_DEVELOPMENT) {
      const response = await fetch(`${API_BASE_URL}/productTypes/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete product type')
      }
      return
    }

    const index = mockData.findIndex(p => p.id === id)
    if (index === -1) {
      throw new Error('Product type not found')
    }
    mockData.splice(index, 1)
    return Promise.resolve()
  }
}
