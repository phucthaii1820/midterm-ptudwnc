/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { toast } from 'react-toastify'

import { validatePass } from 'function/validatePass'
import { resetPassword } from 'api/auth'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

export interface DialogTitleProps {
  id: string
  children?: React.ReactNode
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
    </DialogTitle>
  )
}

const ResetPassword = () => {
  const navigate = useNavigate()
  const { code } = useParams()
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const open = true

  const hanldeReset = async () => {
    if (password === '' || confirmPassword === '') {
      toast.error('Vui lòng nhập đầy đủ thông tin')
      return
    }
    if (password !== confirmPassword) {
      toast.error('Mật khẩu không khớp')
      return
    }

    if (validatePass(password) === false) {
      toast.error('Mật khẩu phải có ít nhất 8 kí tự, bao gồm chữ hoa, chữ thường và số')
      return
    }

    const res = await resetPassword({ code, password })

    if (res.status === 200) {
      toast.success('Đặt lại mật khẩu thành công')
      navigate('/login')
    } else {
      toast.error('Đặt lại mật khẩu thất bại')
    }
  }

  return (
    <BootstrapDialog aria-labelledby="customized-dialog-title" open={open}>
      <BootstrapDialogTitle id="customized-dialog-title">Đặt lại mật khẩu</BootstrapDialogTitle>
      <DialogContent dividers>
        <Grid
          container
          sx={{
            width: '100%',
          }}
          spacing={2}
        >
          <Grid item xs={12}>
            <TextField
              fullWidth
              focused
              size="small"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              placeholder="Mật khẩu mới"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              focused
              size="small"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
              }}
              placeholder="Nhập lại mật khẩu mới"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={hanldeReset}>Đăt lại mật khẩu</Button>
      </DialogActions>
    </BootstrapDialog>
  )
}

export default ResetPassword
