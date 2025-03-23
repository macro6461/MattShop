import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { Text } from '@react-native-material/core'
import { Product } from '../../api/types'
import { styles } from '../../styles'

interface ProductTile {
  onPress: Function
  product: Product
}

const ProductTile: React.FC<ProductTile> = ({ product, onPress }) => {
  const { image, title, price } = product
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(product)}>
      <Image
        source={{ uri: image }}
        style={{ width: '100%', height: 150, borderRadius: 8, marginBottom: 10 }}
        resizeMode="cover"
      />
      <Text variant="h6">{title}</Text>
      <Text variant="body1">${price.toFixed(2)}</Text>
    </TouchableOpacity>
  )
}

export default ProductTile
