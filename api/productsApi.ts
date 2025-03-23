import axios, { AxiosResponse } from 'axios'
import { Product } from './types'

async function fetchProducts(): Promise<Product[]> {
  try {
    const response: AxiosResponse<Product[]> = await axios.get('https://fakestoreapi.com/products')
    return response.data
  } catch (error) {
    throw error // Re-throw the error to be handled by the caller
  }
}

export { fetchProducts } // Exporting for potential testing or use elsewhere
