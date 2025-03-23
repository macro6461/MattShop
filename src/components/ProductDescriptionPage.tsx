import { useEffect } from 'react'
import { Product } from '@/api/types'
import { useAppSelector } from '@/store/hooks'
import { RootState } from '@/store/store'
import { styles } from '@/styles'
import { View, Text, Image } from 'react-native'

const ProductDescriptionPage = () => {
  const { id, title, price, description, category, image, rating } = useAppSelector(
    (state: RootState) => state.productsState.selectedProduct ?? ({} as Product)
  )

  return (
    <View style={styles.container}>
      <View>
        <Text>{title}</Text>
        <Text>
          Rating: {rating.rate} {rating.count} ratings
        </Text>
      </View>
      <Image
        source={{ uri: image }}
        style={{ width: '100%', height: 150, borderRadius: 8, marginBottom: 10 }}
        resizeMode="cover"
      />
      <Text>${price}</Text>
      <Text>More Info: {description}</Text>
      <Text>Category: {category}</Text>
    </View>
  )
}

export default ProductDescriptionPage
