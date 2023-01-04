import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { toast, ToastContainer } from 'react-toastify'
import io from 'socket.io-client'
import userStore from 'stores/user'

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

interface PropsGroup {
  groupName: string
  groupId: string
  presentationId: string
}

// const BASE_HOST = process.env.REACT_APP_BASE_HOST_FE
const BASE_API = process.env.REACT_APP_BASE_HOST
const socket = io(BASE_API?.toString() || 'http://localhost:3000', {
  transports: ['websocket'],
  auth: {
    token: userStore.getState().token,
  },
})

function App() {
  const { setGroup, group } = userStore()
  const [groupPresent, setGroupPresent] = React.useState<PropsGroup>({
    groupName: '',
    groupId: '',
    presentationId: '',
  })
  React.useEffect(() => {
    socket.emit('group:waiting', (res: any) => {
      if (res?.error?.code !== 'user_not_found') {
        setGroup(res)
      }
    })
    socket.on('group:start-present', (res: PropsGroup) => {
      setGroupPresent(res)
    })

    socket.on('group:end-present', (res: PropsGroup) => {
      setGroup(group.filter((item) => item.groupId !== res.groupId))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    if (groupPresent.groupName !== '') {
      let check = false
      for (let i = 0; i < group.length; i += 1) {
        if (group[i].groupId === groupPresent.groupId) {
          check = true
        }
      }
      if (!check) {
        setGroup([...group, groupPresent])
        toast.success(`Nhóm ${groupPresent.groupName} bắt đầu thuyết trình`)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupPresent])

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
