import React from 'react'
import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import { teal } from '@mui/material/colors'

import Layout from '../../components/layouts/Layout'

const ChangePassword = () => {
  return (
    <Layout>
      <Container
        maxWidth="md"
        sx={{
          mt: 4,
        }}
      >
        <Typography variant="h4" textTransform="uppercase" textAlign="center">
          Thay đổi mật khẩu
        </Typography>
        <Grid container mt={4} spacing={3}>
          <Grid item xs={12}>
            <TextField label="Mật khẩu cũ" fullWidth type="password" />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Mật khẩu mới" fullWidth type="password" />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Xác nhận mật khẩu mới" fullWidth type="password" />
          </Grid>
          <Grid item xs={12}>
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
                    // setIsEdit(true)
                  }}
                >
                  Thay đổi mật khẩu
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}

export default ChangePassword
