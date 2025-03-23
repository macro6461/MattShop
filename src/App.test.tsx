import { render, screen } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import store from '../store/store' // adjust this import path as needed

import App from './App'

describe('App', () => {
  const renderWithProvider = () => {
    return render(
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
  it('should mount without errors', () => {
    expect(() => renderWithProvider()).not.toThrow()
  })

  it('should unmount without errors', () => {
    renderWithProvider()
    expect(() => screen.unmount()).not.toThrow()
  })
})
