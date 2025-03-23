import { useState, useEffect, useRef } from 'react'
import { FlatList, SafeAreaView, Text } from 'react-native'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { selectProduct } from '../../store/slices/productsSlice'
import { Product } from '@/api/types'
import { useNavigation, CommonActions, NavigationProp } from '@react-navigation/native'
import ProductTile from './ProductTile'
import SearchBar from './SearchBar'
import React from 'react'
import MattShopError from './MattShopError'
import { styles } from '@/styles'
import { RootState } from '@/store/store'
import { setPendingProductRedirect } from '@/store/slices/authSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ProductsFeed = () => {
  const { products, loading, productError, selectedProduct } = useAppSelector(
    (state: RootState) => state.productsState
  )
  const { loggedIn, pendingProductRedirect } = useAppSelector((state: RootState) => state.authState)
  const navigation = useNavigation<NavigationProp<any>>()

  const dispatch = useAppDispatch()

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  useEffect(() => {
    setFilteredProducts(products)
  }, [products])

  useEffect(() => {
    if (loggedIn && pendingProductRedirect) {
      setTimeout(() => {
        navigation.dispatch(
          CommonActions.navigate({
            name: 'Product Description',
            params: { productId: pendingProductRedirect }
          })
        )
        dispatch(setPendingProductRedirect(null)) // Clear redirect
      }, 100) // Small delay to ensure navigation occurs after state update
    }
  }, [loggedIn, pendingProductRedirect])

  const handlePress = async (product: Product) => {
    dispatch(selectProduct(product))
    if (!loggedIn) {
      await AsyncStorage.setItem('pendingProductRedirect', JSON.stringify(product.id))
      dispatch(setPendingProductRedirect(product.id))
      navigation.navigate('Log In')
    } else {
      navigation.navigate('Product Description', { productId: product.id })
    }
  }
  const cleanStringComp = (strOne: string, strTwo: string) => {
    return {
      searchStr: strOne.toLowerCase().replace(/['\s`-]/g, ''),
      compStr: strTwo.toLowerCase().replace(/['\s`-]/g, '')
    }
  }

  const filterProducts = (search: string) => {
    let newProducts = [...products].filter((product) => {
      let { searchStr, compStr } = cleanStringComp(search, product.title)
      const subStr = compStr.substring(0, searchStr.length)
      return subStr === searchStr
    })
    setFilteredProducts(newProducts)
  }

  return (
    <SafeAreaView style={styles.container}>
      {productError ? (
        <MattShopError {...productError} />
      ) : (
        <>
          <SearchBar onFilter={filterProducts} />
          {filteredProducts.length > 0 ? (
            <FlatList
              data={filteredProducts}
              keyExtractor={(item: Product, index: number) => `${index}`}
              renderItem={({ item }) => <ProductTile product={item} onPress={handlePress} />}
            />
          ) : (
            <Text>No Results Found.</Text>
          )}
        </>
      )}
    </SafeAreaView>
  )
}

export default ProductsFeed
