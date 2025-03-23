import React from 'react'
import { ReactElement, useEffect } from 'react'
import { Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { RootState } from '@/store/store'
import { handleGetProfile, setPendingProductRedirect } from '@/store/slices/authSlice'
import ProductsFeed from './components/ProductsFeed'
import LogInPage from './components/LogInPage'
import ProductDescriptionPage from './components/ProductDescriptionPage'
import Profile from './components/Profile'
import { styles } from '@/styles'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const App = (): ReactElement => {
  const { loggedIn, profile } = useAppSelector((state: RootState) => state.authState)
  const { selectedProduct } = useAppSelector((state: RootState) => state.productsState)
  const dispatch = useAppDispatch()

  useEffect(() => {
    checkAsyncLogin('loggedIn')
  }, [])

  useEffect(() => {
    handleAsyncStorage('loggedIn', profile?.id ?? null)
  }, [loggedIn, profile])

  const handleAsyncStorage = async (key: string, value: number | null) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      throw e
    }
  }

  const checkAsyncLogin = async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      let userId = jsonValue ? JSON.parse(jsonValue) : null
      if (userId) {
        dispatch(handleGetProfile({ userId }))
        // Restore pendingProductRedirect if exists
        const pendingRedirect = await AsyncStorage.getItem('pendingProductRedirect')
        if (pendingRedirect && selectedProduct) {
          dispatch(setPendingProductRedirect(JSON.parse(pendingRedirect)))
        }
        await AsyncStorage.removeItem('pendingProductRedirect') // Clear after use
      }
    } catch (e) {
      throw e
    }
  }

  const ProductStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Product Feed" component={ProductsFeed} options={{ headerShown: false }} />
      <Stack.Screen
        name="Product Description"
        component={ProductDescriptionPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.appHeader}>MattShop</Text>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="Product Feed"
              component={ProductStack}
              options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <MaterialIcons name="list" size={size} color={color} />
                )
              }}
            />
            {!loggedIn ? (
              <Tab.Screen
                name="Log In"
                component={LogInPage}
                options={{
                  headerShown: false,
                  tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="login" size={size} color={color} />
                  )
                }}
              />
            ) : (
              <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                  headerShown: false,
                  tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="account-circle" size={size} color={color} />
                  )
                }}
              />
            )}
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default App
