import { RootState } from '@/store/store'
import { useAppDispatch } from '@/store/hooks'
import { ProfileProps } from '../../api/types'
import { useAppSelector } from '@/store/hooks'
import { View, TouchableOpacity } from 'react-native'
import { handleLogOut } from '@/store/slices/authSlice'
import { styles } from '@/styles'
import { Text, Button } from '@react-native-material/core'
import React from 'react'
import { useNavigation, CommonActions } from '@react-navigation/native'

const Profile = () => {
  const { name, address, phone, email } = useAppSelector(
    (state: RootState) => state.authState.profile ?? ({} as ProfileProps)
  )
  const dispatch = useAppDispatch()
  const navigation = useNavigation()
  const handleLogOutNav = () => {
    dispatch(handleLogOut())
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'Product Feed'
          }
        ]
      })
    )
  }
  let { city, zipcode, street, number } = address
  return (
    <View style={styles.profileContainer}>
      <Text variant="h3">
        {name.firstname} {name.lastname}
      </Text>
      <View style={styles.profileBody}>
        <Text variant="h6" style={styles.profileBodyText}>
          Phone:
        </Text>
        <Text variant="body1">{phone}</Text>
      </View>
      <View style={styles.profileBody}>
        <Text variant="h6" style={styles.profileBodyText}>
          Email:
        </Text>
        <Text variant="body1">{email}</Text>
      </View>
      <View style={styles.profileBody}>
        <Text variant="h6" style={styles.profileBodyText}>
          Address:
        </Text>
        <View>
          <Text variant="body1">
            {number} {street}
          </Text>
          <Text variant="body1">{city}</Text>
          <Text variant="body1">{zipcode}</Text>
        </View>
      </View>
      <Button
        title="Log Out"
        variant="contained"
        color="red"
        style={styles.button}
        onPress={handleLogOutNav}
      />
    </View>
  )
}

export default Profile
