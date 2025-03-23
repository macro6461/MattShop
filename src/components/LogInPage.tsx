import { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { TextInput, Button } from '@react-native-material/core'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { handleLoginUser } from '@/store/slices/authSlice'
import { styles } from '@/styles'
import { RootState } from '@/store/store'

const LogInPage = () => {
  const dispatch = useAppDispatch()
  const { userError } = useAppSelector((state: RootState) => state.authState)
  const [username, setUsername] = useState('david_r')
  const [password, setPassword] = useState('3478*#54')
  const [error, setError] = useState('')

  useEffect(() => {
    if (userError) {
      setError(`${userError.code}: ${userError.message}`)
    }
  }, [userError])

  const handleNameChange = (value: string) => {
    setUsername(value)
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
  }

  const submitLogin = () => {
    if (username.length === 0 || password.length === 0) {
      setError('Please enter both fields.')
      return
    }
    setError('')
    dispatch(handleLoginUser({ username, password }))
  }

  return (
    <View style={styles.login}>
      <Text style={styles.loginHeader}>Login</Text>
      <TextInput
        onChangeText={handleNameChange}
        value={username}
        label="Name"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        onChangeText={handlePasswordChange}
        value={password}
        label="Password"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Button title="Let's Shop!" onPress={submitLogin} style={styles.loginButton} />
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
    </View>
  )
}

export default LogInPage
