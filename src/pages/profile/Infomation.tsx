import React from 'react'
import { Container } from '@mui/material'
import Layout from '../../components/layouts/Layout'

const Infomation = () => {
  return (
    <Layout>
      <Container
        maxWidth="md"
        sx={{
          mt: 4,
        }}
      >
        Thông tin tài khoản
      </Container>
    </Layout>
  )
}

export default Infomation
