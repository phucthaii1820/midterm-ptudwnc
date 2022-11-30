/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { toast } from 'react-toastify'

import Layout from '../../components/layouts/Layout'
import { joinGroupByLink } from '../../api/group'

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

const JoinGroupByLink = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const open = true
  const [message, setMessage] = React.useState('')
  const [isPending, setIsPending] = React.useState(true)

  const joinGroup = async (idL: string) => {
    const res = await joinGroupByLink(idL)

    if (res?.data?.error?.code === 'invalid_link') {
      toast.error('Link không hợp lệ')
      setMessage('Link không hợp lệ')
    } else if (res?.data?.error?.code === 'user_joined') {
      toast.error('Bạn đã tham gia nhóm này')
      setMessage('Bạn đã tham gia nhóm này')
    } else {
      toast.success('Tham gia nhóm thành công')
      setMessage('Tham gia nhóm thành công')
    }
    setIsPending(false)
  }

  React.useEffect(() => {
    if (id) joinGroup(id)
  }, [id])

  return (
    <Layout>
      <BootstrapDialog aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title">Tham gia group bằng link</BootstrapDialogTitle>
        <DialogContent dividers>
          {isPending ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Typography gutterBottom>{message}</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            disabled={isPending}
            onClick={() => {
              navigate('/')
            }}
          >
            Về trang chủ
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Layout>
  )
}

export default JoinGroupByLink
