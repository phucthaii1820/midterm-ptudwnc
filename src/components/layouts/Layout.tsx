import React, { ReactNode } from 'react'
import { Box } from '@mui/material'
import Header from './Header'

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 100,
        }}
      >
        <Header />
      </Box>
      <Box sx={{ pt: '64px' }}>{children}</Box>
    </Box>
  )
}

export default Layout
