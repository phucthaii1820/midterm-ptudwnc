import React from 'react'
import {
  Avatar,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'

import { GroupMember } from '../../types/group'

const roles = [
  {
    value: 'owner',
    label: 'Quản trị viên',
  },
  {
    value: 'co-owner',
    label: 'Đồng sáng lập',
  },
  {
    value: 'member',
    label: 'Thành viên',
  },
]

const CardMenber = ({ fullName, email, role }: GroupMember) => {
  const [openModal, setOpenModal] = React.useState(false)
  const [roleMember, setRoleMember] = React.useState(role)

  React.useEffect(() => {
    setRoleMember(role)
  }, [role, openModal])

  return (
    <Grid
      container
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Grid item xs={1}>
        <Avatar
          sx={{
            height: '50px',
            width: '50px',
          }}
        />
      </Grid>

      <Grid item xs={10}>
        <Typography
          sx={{
            fontWeight: 'bold',
          }}
        >
          {fullName}
        </Typography>
        <Typography>{email}</Typography>
      </Grid>
      <Grid
        item
        xs={1}
        sx={{
          display: 'flex',
          justifyContent: 'end',
        }}
      >
        <IconButton
          onClick={() => {
            setOpenModal(true)
          }}
        >
          <SettingsIcon />
        </IconButton>
      </Grid>

      <Dialog
        onClose={() => {
          setOpenModal(false)
        }}
        open={openModal}
      >
        <DialogTitle>
          <Typography
            sx={{
              fontWeight: 'bold',
              textTransform: 'uppercase',
              textAlign: 'center',
            }}
          >
            Đổi quyền
          </Typography>
          <Select
            value={roleMember}
            onChange={(event: SelectChangeEvent) => {
              setRoleMember(event.target.value)
            }}
            // disabled={role === 'owner'}
          >
            {roles.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </DialogTitle>
      </Dialog>
    </Grid>
  )
}

export default CardMenber
