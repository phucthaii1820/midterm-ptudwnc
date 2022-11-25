import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'

import WebRoute from './router'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Kodchasan',
      textTransform: 'none',
      // fontSize: 16,
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <WebRoute />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ThemeProvider>
  )
}

export default App
