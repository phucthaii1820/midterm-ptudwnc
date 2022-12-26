import React from 'react'
import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import { teal } from '@mui/material/colors'
import { toast } from 'react-toastify'

import Layout from 'components/layouts/Layout'
import { changePassword } from 'api/user'
import { validatePass } from 'function/validatePass'
import userStore from 'stores/user'

const ChangePassword = () => {
  const { setDataUser } = userStore()

  const [oldPassword, setOldPassword] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')

  const handleChangePassword = async () => {
    if (oldPassword === '' || newPassword === '' || confirmPassword === '') {
      toast.error('Vui lòng nhập đầy đủ thông tin')
      return
    }
    if (oldPassword === newPassword) {
      toast.error('Mật khẩu mới không được trùng với mật khẩu cũ')
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error('Mật khẩu mới không khớp')
      return
    }
    if (!validatePass(newPassword)) {
      toast.error('Mật khẩu phải có ít nhất 6 ký tự, tối đa 16 ký tự, có ít nhất 1 ký tự số và 1 ký tự đặc biệt')
      return
    }

    const res = await changePassword({ oldPassword, newPassword })

    if (res?.data?.error?.code === 'invalid_password') {
      toast.error('Mật khẩu cũ không đúng')
    } else {
      toast.success('Đổi mật khẩu thành công')
      setDataUser(res?.data?.data)
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
    }
  }

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
            <TextField
              label="Mật khẩu cũ"
              fullWidth
              type="password"
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value)
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Mật khẩu mới"
              fullWidth
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value)
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Xác nhận mật khẩu mới"
              fullWidth
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
              }}
            />
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
                  onClick={handleChangePassword}
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
