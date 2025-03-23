interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

interface ProductsState {
  products: Product[]
  selectedProduct: Product | null
  loading: boolean
  productError: MattShopErrorProps | null
}

interface AuthState {
  profile: ProfileProps | null
  loggedIn: boolean
  userError: MattShopErrorProps | null
  loading: boolean
  pendingProductRedirect: number | null
}

interface SearchBarProps {
  onChange: () => void
  value: string
}

interface MattShopErrorProps {
  code?: number | string
  message?: string
  details?: string
}

interface ProfileProps {
  id: number
  name: { firstname: string; lastname: string }
  phone: string
  email: string
  username: string
  address: { city: string; number: number; street: string; zipcode: string; geolocation: string }
  password?: string
}

export { Product, ProductsState, SearchBarProps, MattShopErrorProps, AuthState, ProfileProps }
