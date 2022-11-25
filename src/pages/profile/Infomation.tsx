import React from 'react'
import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import { teal, red } from '@mui/material/colors'

import Layout from '../../components/layouts/Layout'
import userStore from '../../stores/user'

const Infomation = () => {
  const { user } = userStore()
  const [isEdit, setIsEdit] = React.useState(false)

  return (
    <Layout>
      <Container
        maxWidth="md"
        sx={{
          mt: 4,
        }}
      >
        <Typography variant="h4" textTransform="uppercase" textAlign="center">
          Thông tin tài khoản
        </Typography>
        <Grid container mt={4} spacing={3}>
          <Grid item xs={12}>
            <TextField value={user?.email} disabled label="Email" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField value={user?.fullName} disabled={!isEdit} label="Họ và tên" fullWidth />
          </Grid>
          <Grid item xs={12}>
            {!isEdit ? (
              <Grid container justifyContent="flex-end">
                <Grid item xs={3} display="flex" justifyContent="flex-end">
                  <Button
                    sx={{
                      py: 1,
                      px: 4,
                      background: teal[400],
                      color: 'white',
                      '&:hover': {
                        background: teal[300],
                      },
                    }}
                    onClick={() => {
                      setIsEdit(true)
                    }}
                  >
                    Thay đổi thông tin
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Grid container justifyContent="flex-end" spacing={1}>
                <Grid item xs={1.5} display="flex" justifyContent="flex-end">
                  <Button
                    sx={{
                      py: 1,
                      px: 4,
                      background: teal[400],
                      color: 'white',
                      '&:hover': {
                        background: teal[300],
                      },
                    }}
                    onClick={() => {
                      setIsEdit(false)
                    }}
                  >
                    Lưu
                  </Button>
                </Grid>
                <Grid item xs={1.5} display="flex" justifyContent="flex-end">
                  <Button
                    sx={{
                      py: 1,
                      px: 4,
                      background: red[400],
                      color: 'white',
                      '&:hover': {
                        background: red[300],
                      },
                    }}
                    onClick={() => {
                      setIsEdit(false)
                    }}
                  >
                    Hủy
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}

export default Infomation
