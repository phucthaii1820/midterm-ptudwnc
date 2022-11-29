/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import { Grid, TextField } from '@mui/material'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { teal } from '@mui/material/colors'

import { activeAccount, resendCode } from '../../api/auth'
import userStore from '../../stores/user'

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
  onClose: () => void
}

interface PropsOTP {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  email: string
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

export default function OTP_G({ open, setOpen, email }: PropsOTP) {
  const navigate = useNavigate()
  const [code, setCode] = React.useState('')
  const { setDataUser } = userStore()

  const handleClose = () => {
    setOpen(false)
  }

  const handleCode = async () => {
    const res = await activeAccount({ email, code })
    if (res?.data?.error?.code === 'invalid_code') {
      toast.error('Mã code không đúng')
      return
    }
    if (res?.data?.data?.code === 'success') {
      setOpen(false)
      setDataUser(res?.data?.data?.user)
      toast.success('Đăng kí thành công')
      navigate('/')
    }
  }

  const handleResend = async () => {
    await resendCode({ email }).then(() => {
      toast.success('Gửi lại mã thành công')
    })
  }

  return (
    <div>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Nhập mã xác nhận
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Vui lòng kiểm tra email của bạn để tìm mã xác nhận. Mã xác nhận có độ dài 6 ký tự.
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{
              alignItems: 'center',
            }}
          >
            <Grid item xs={4}>
              <TextField
                size="small"
                value={code}
                label="Mã xác nhận"
                onChange={(e) => {
                  setCode(e.target.value)
                }}
              />
            </Grid>
            <Grid item xs={8}>
              <Typography>Chúng tôi đã gửi mã xác nhận qua email: {email}</Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleResend}>
            Gửi lại code
          </Button>
          <Button
            autoFocus
            onClick={handleCode}
            sx={{
              backgroundColor: teal[500],
              color: '#fff',
              '&:hover': {
                backgroundColor: teal[700],
              },
            }}
          >
            Gửi
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  )
}
