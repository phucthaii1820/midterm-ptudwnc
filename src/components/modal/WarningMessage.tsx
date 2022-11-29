import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'

interface Props {
  open: boolean
  title: string
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  button: React.ReactNode
  actionAgree: () => void
}

export default function WarningMessage({ open, title, setOpen, button, actionAgree }: Props) {
  // const handleClickOpen = () => {
  //   setOpen(true)
  // }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      {button}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>không đồng ý</Button>
          <Button onClick={actionAgree} autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
