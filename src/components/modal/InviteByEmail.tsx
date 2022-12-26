/* eslint-disable no-useless-escape */
import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Box, Chip, IconButton, TextField } from '@mui/material'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import { teal, grey } from '@mui/material/colors'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { sentInviteEmail } from 'api/group'

interface PropsEmails {
  id: string
  value: string
}

interface Props {
  disabled: boolean
  groupId: string
}

export default function AlertDialog({ disabled, groupId }: Props) {
  const [open, setOpen] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [error, setError] = React.useState(false)
  const [emails, setEmails] = React.useState([] as PropsEmails[])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSendEmail = async () => {
    // eslint-disable-next-line prefer-const
    let value: string[] = []
    emails.forEach((item) => {
      value.push(item.value)
    })
    const res = await sentInviteEmail(groupId, value)

    if (res?.data?.code === 200) {
      toast.success('Gửi email thành công')
      setOpen(false)
      setEmails([])
    } else {
      toast.error('Gửi email thất bại')
    }
  }

  const isEmail = (emailValid: string) => {
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(emailValid)
  }

  return (
    <div>
      <IconButton
        sx={{
          color: 'white',
        }}
        onClick={handleClickOpen}
        disabled={disabled}
      >
        <PersonAddIcon fontSize="large" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          Thêm thành viên bằng email
        </DialogTitle>
        <DialogContent
          sx={{
            minWidth: '400px',
          }}
        >
          <TextField
            fullWidth
            focused
            size="small"
            type="email"
            value={email}
            onChange={(e) => {
              setError(false)
              setEmail(e.target.value)
            }}
            onKeyPress={(ev) => {
              if (ev.key === ' ' || ev.key === 'Enter') {
                if (isEmail(email)) {
                  setEmails([...emails, { id: uuidv4(), value: email }])
                  setEmail('')
                } else {
                  setError(true)
                  toast.error('Email không hợp lệ')
                }
                ev.preventDefault()
              }
            }}
            placeholder="Nhập email và nhấn enter hoặc space"
            error={error}
          />
          <Box mt={2}>
            {emails.map((item) => (
              <Chip
                key={item.id}
                label={item.value}
                variant="outlined"
                onDelete={() => {
                  setEmails(emails.filter((i) => i.id !== item.id))
                }}
                sx={{
                  m: 0.2,
                  borderColor: teal[500],
                  color: teal[500],
                }}
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>hủy</Button>
          <Button
            onClick={handleSendEmail}
            autoFocus
            sx={{
              backgroundColor: teal[500],
              color: 'white',
              '&:hover': {
                backgroundColor: teal[700],
              },
              '&:disabled': {
                backgroundColor: grey[500],
              },
            }}
            disabled={emails.length === 0}
          >
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
