import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import GlobalStyle from './utils/styles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ContextProvider from './context/context'

ReactDOM.render(
    <React.StrictMode>
        <GlobalStyle />
        <ToastContainer
            position="bottom-center"
            autoClose={5000}
            newestOnTop={false}
            limit={1}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
        <ContextProvider>
            <App />
        </ContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
)
