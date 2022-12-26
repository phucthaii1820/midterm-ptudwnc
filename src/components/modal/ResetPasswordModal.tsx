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
import { teal } from '@mui/material/colors'
import { isEmail } from 'function/validateEmail'
import { toast } from 'react-toastify'
import { sendCodeResetPassword } from 'api/auth'

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

export default function OTP_G() {
  const [email, setEmail] = React.useState('')
  const [open, setOpen] = React.useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const hanldeSendCode = async () => {
    if (!isEmail(email)) {
      toast.error('Email không hợp lệ')
    } else {
      const res = await sendCodeResetPassword({ email })
      if (res.status === 200) {
        toast.success('Kiểm tra email để đặt lại mật khẩu')
        setOpen(false)
      } else {
        toast.error('Email không tồn tại')
      }
    }
  }

  return (
    <div>
      <Typography
        textAlign="right"
        color={teal[500]}
        onClick={() => {
          setOpen(true)
        }}
        sx={{
          cursor: 'pointer',
        }}
      >
        Quên mật khẩu?
      </Typography>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Đặt lại mật khẩu
        </BootstrapDialogTitle>
        <DialogContent
          dividers
          sx={{
            minWidth: '400px',
          }}
        >
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
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                placeholder="Nhập email của bạn"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={hanldeSendCode}
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
