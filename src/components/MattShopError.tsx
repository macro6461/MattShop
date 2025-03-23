import { View, Text } from 'react-native'
import { MattShopErrorProps } from '../../api/types'
import { styles } from '../../styles'

const ErrorComponent: React.FC<MattShopErrorProps> = ({ code, message, details }) => {
  return (
    <View>
      <Text style={styles.error}>CODE: {code}</Text>
      <Text style={styles.error}>MESSAGE: {message}</Text>
      {details ? <Text style={styles.error}>DETAILS: {details}</Text> : null}
    </View>
  )
}

export default ErrorComponent
