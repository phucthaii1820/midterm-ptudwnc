import React from 'react'
import { Box, Button, Divider, Grid, TextField, Typography } from '@mui/material'
import { teal, grey } from '@mui/material/colors'
import { useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { login } from '../../api/auth'
import userStore from '../../stores/user'
import LoginG from '../../components/button/LoginG'
import OTP_G from '../../components/modal/OTP_G'

const Login = () => {
  const { setDataUser } = userStore()
  const navigate = useNavigate()
  const { handleSubmit, control } = useForm()
  const [openModal, setOpenModal] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [buttonDisabled, setButtonDisabled] = React.useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLogin = async (data: any) => {
    setEmail(data.email)
    setButtonDisabled(true)
    const res = await toast.promise(login({ email: data.email, password: data.password }), {
      pending: 'Đang đăng nhập...',
    })
    if (res?.data?.error?.code === 'invalid_email' || res?.data?.error?.code === 'invalid_password') {
      toast.error('Email hoặc mật khẩu không đúng')
      setButtonDisabled(false)
      return
    }
    if (res?.data?.error?.code === 'user_inactive') {
      toast.error('Tài khoản chưa được kích hoạt')
      setOpenModal(true)
      setButtonDisabled(false)
      return
    }
    if (res.status === 200) {
      setDataUser(res?.data?.data)
      toast.success('Đăng nhập thành công')
      navigate('/')
    }

    setButtonDisabled(false)
  }
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
              background: 'white',
              cursor: 'pointer',
            }}
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
              borderBottom: '1px solid #ccc',
              py: 2,
              cursor: 'pointer',
            }}
            onClick={() => navigate('/register')}
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

        <form onSubmit={handleSubmit(handleLogin)}>
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
                    label="Email"
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
                disabled={buttonDisabled}
              >
                Đăng nhập
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

            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <LoginG />
            </Grid>
          </Grid>
        </form>

        <OTP_G open={openModal} setOpen={setOpenModal} email={email} />
      </Box>
    </Box>
  )
}

export default Login
