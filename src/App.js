import { Provider } from 'react-redux'
import { store } from './lib/store'
import { InboxScreen } from './components'

import './index.css'
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <InboxScreen />
    </Provider>
  );
}

export default App;
