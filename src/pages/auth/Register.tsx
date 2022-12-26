/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Divider, Grid, TextField, Typography } from '@mui/material'
import { teal, grey } from '@mui/material/colors'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import LoginG from 'components/button/LoginG'
import OTP_G from 'components/modal/OTP_G'
import { register } from 'api/auth'
import { validatePass } from 'function/validatePass'

const Login = () => {
  const navigate = useNavigate()
  const { handleSubmit, control } = useForm()
  const [openModal, setOpenModal] = React.useState(false)
  const [email, setEmail] = React.useState('')

  const onSubmit = async (data: any) => {
    setEmail(data.email)

    if (data.password !== data.confirm_password) {
      toast.error('Mật khẩu không khớp')
      return
    }
    if (!validatePass(data.password)) {
      toast.error('Mật khẩu phải có ít nhất 6 ký tự, tối đa 16 ký tự, có ít nhất 1 ký tự số và 1 ký tự đặc biệt')
      return
    }

    const res = await toast.promise(register({ email: data.email, password: data.password, fullName: data.fullname }), {
      pending: 'Đang đăng kí...',
    })

    if (res.status === 201) {
      setOpenModal(true)
    }
    if (res?.data?.error?.code === 'account_exist') {
      toast.error('Tài khoản đã tồn tại')
    }
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

        <OTP_G open={openModal} setOpen={setOpenModal} email={email} />
      </Box>
    </Box>
  )
}

export default Login
