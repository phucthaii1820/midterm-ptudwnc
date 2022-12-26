import React from 'react'
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import { teal, grey } from '@mui/material/colors'
import { toast } from 'react-toastify'

import { GroupMember } from 'types/group'
import { changeRole, kickUser } from 'api/group'
import WarningMessage from 'components/modal/WarningMessage'

const roles = [
  {
    value: 'owner',
    label: 'Quản trị viên',
  },
  {
    value: 'co_owner',
    label: 'Đồng sáng lập',
  },
  {
    value: 'member',
    label: 'Thành viên',
  },
]

function getLabelRole(value: string, value2: string) {
  return value === value2
}

const CardMenber = ({ fullName, email, role, myRole, groupId, id, fetchData }: GroupMember) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [openWarning, setOpenWarning] = React.useState(false)
  const openMenu = Boolean(anchorEl)

  const handleClose = () => {
    setAnchorEl(null)
  }
  const [openModal, setOpenModal] = React.useState(false)
  const [roleMember, setRoleMember] = React.useState(role)

  const handleChangeRole = async () => {
    const res = await changeRole(groupId, id, roleMember)

    if (res?.data?.status === 200) {
      toast.success('Thay đổi quyền thành công')
      fetchData()
      setOpenModal(false)
    }
    if (res?.data?.error?.code === 'permission_denied') {
      toast.error('Bạn không có quyền này')
      setOpenModal(false)
    }
  }

  const handleKickMember = async () => {
    const res = await kickUser(groupId, id)

    if (res?.data?.status === 200) {
      toast.success('Xóa thành viên thành công')
      fetchData()
    }
    if (res?.data?.error?.code === 'permission_denied') {
      toast.error('Bạn không có quyền này')
      setOpenModal(false)
    }
  }

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
          {fullName} - {email}
        </Typography>
        <Typography>{roles.filter((item) => getLabelRole(item.value, role)).map((item) => item.label)}</Typography>
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
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget)
          }}
        >
          <SettingsIcon />
        </IconButton>
      </Grid>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={() => {
            setOpenModal(true)
          }}
          disabled={myRole === 'member'}
        >
          Đổi quyền
        </MenuItem>

        <WarningMessage
          open={openWarning}
          title="Bạn có chắc chắn muốn thoát nhóm không?"
          setOpen={setOpenWarning}
          button={
            <MenuItem
              onClick={() => {
                setOpenWarning(true)
              }}
              disabled={myRole === 'member'}
            >
              Xóa thành viên
            </MenuItem>
          }
          actionAgree={handleKickMember}
        />
      </Menu>

      <Dialog
        onClose={() => {
          setOpenModal(false)
        }}
        open={openModal}
      >
        <DialogTitle
          sx={{
            width: '300px',
          }}
        >
          <Typography
            sx={{
              fontWeight: 'bold',
              textTransform: 'uppercase',
              textAlign: 'center',
            }}
          >
            Đổi quyền
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={9}>
              <Select
                size="small"
                fullWidth
                value={roleMember}
                onChange={(event: SelectChangeEvent) => {
                  setRoleMember(event.target.value)
                }}
                disabled={role === 'owner'}
              >
                {roles.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={3}>
              <Button
                sx={{
                  width: '100%',
                  backgroundColor: teal[500],
                  color: 'white',
                  '&:hover': {
                    backgroundColor: teal[700],
                  },
                  '&:disabled': {
                    backgroundColor: grey[500],
                    color: 'white',
                  },
                }}
                onClick={handleChangeRole}
                disabled={role === roleMember}
              >
                Đổi
              </Button>
            </Grid>
          </Grid>
        </DialogTitle>
      </Dialog>
    </Grid>
  )
}

export default CardMenber
