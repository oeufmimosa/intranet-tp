import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import reducer from './reducers/reducer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

const store = createStore(reducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>,
)
