import { Box, Button, Divider, Grid, TextField, Typography } from '@mui/material'
import { teal, grey } from '@mui/material/colors'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import LoginG from '../../components/button/LoginG'

const Login = () => {
  const navigate = useNavigate()
  const { handleSubmit, control } = useForm()

  const onSubmit = (data: any) => console.log(data)

  return (
    <Box mt={20}>
      <Box
        sx={{
          width: '40%',
          mx: 'auto',
          border: '1px solid #ccc',
          borderRadius: '5px',
        }}
      >
        <Grid
          container
          sx={{
            background: grey[50],
          }}
        >
          <Grid
            item
            xs={6}
            sx={{
              borderRight: '1px solid #ccc',
              py: 2,
              cursor: 'pointer',
              borderBottom: '1px solid #ccc',
            }}
            onClick={() => navigate('/login')}
          >
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',
              }}
            >
              Đăng nhập
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              py: 2,
              cursor: 'pointer',
              background: 'white',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',
              }}
            >
              Đăng kí
            </Typography>
          </Grid>
        </Grid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            sx={{
              width: '100%',
              p: '30px 46px',
            }}
            spacing={2}
          >
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <TextField
                    required
                    name="email"
                    id="outlined-basic"
                    label=" Email"
                    variant="outlined"
                    type="email"
                    fullWidth
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="fullname"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <TextField
                    required
                    name="fullname"
                    id="outlined-basic"
                    label="Họ và tên"
                    variant="outlined"
                    type="text"
                    fullWidth
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                defaultValue=""
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    required
                    id="outlined-basic"
                    label="Mật khẩu"
                    variant="outlined"
                    fullWidth
                    type="password"
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="confirm_password"
                defaultValue=""
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    required
                    id="outlined-basic"
                    label="Nhập lại mật khẩu"
                    variant="outlined"
                    fullWidth
                    type="password"
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                sx={{
                  py: 2,
                  background: teal[400],
                  color: 'white',
                  '&:hover': {
                    background: teal[300],
                  },
                }}
                type="submit"
              >
                Đăng kí
              </Button>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
              }}
            >
              <Grid
                container
                sx={{
                  alignItems: 'center',
                }}
              >
                <Grid item xs={5.5}>
                  <Divider light />
                </Grid>
                <Grid item xs={1}>
                  <Typography textAlign="center" color="#ccc">
                    Hoặc
                  </Typography>
                </Grid>
                <Grid item xs={5.5}>
                  <Divider light />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <LoginG />
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  )
}

export default Login
