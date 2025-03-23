import { registerRootComponent } from 'expo'
import { Provider } from 'react-redux'
import store from './store/store'
import App from './src/App'

const Root: React.FC = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

registerRootComponent(Root)
