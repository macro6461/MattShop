import { Platform, StyleSheet } from 'react-native'

const sharedButton = {
  marginTop: 20,
  elevation: 5, // For Android
  ...Platform.select({
    ios: {
      shadowOffset: { width: 0, height: 2 } // iOS only
    }
  })
}

export const styles = StyleSheet.create({
  appHeader: {
    textAlign: 'center',
    fontSize: 20
  },
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  productHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: 'white',
    textAlign: 'center'
  },
  container: { flex: 1, backgroundColor: '#f8f8f8', width: '100%' },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: 'white',
    textAlign: 'center'
  },
  card: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 } // iOS only
      }
    })
  },
  error: {
    color: 'red'
  },
  loginHeader: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10
  },
  login: {
    display: 'flex',
    height: 500,
    width: 250,
    justifyContent: 'center',
    margin: 'auto'
  },
  button: {
    ...sharedButton
  },
  loginButton: {
    ...sharedButton,
    display: 'flex',
    alignSelf: 'center'
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  profileBody: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical: 5
  },
  profileBodyText: {
    textAlign: 'left'
  }
})
