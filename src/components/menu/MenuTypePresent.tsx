import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { teal } from '@mui/material/colors'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { useNavigate } from 'react-router-dom'
import { Modal } from 'antd'
import { Select, SelectChangeEvent } from '@mui/material'

import { getAllGroups } from 'api/group'
import { Group } from 'types/group'
import { TYPE_CO_OWNER, TYPE_OWNER } from 'consts/role'
import { checkGroupPresent } from 'api/presentation'
import { toast } from 'react-toastify'

interface MenuTypePresentProps {
  idS: string
  idP: string
}

export default function MenuTypePresent({ idP, idS }: MenuTypePresentProps) {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [isModalOpenPresentGroup, setIsModalOpenShare] = React.useState(false)
  const [groups, setGroups] = React.useState([] as Group[])
  const [selectGroup, setSelectGroup] = React.useState('' as string)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
    setSelectGroup('')
  }

  const getGroup = async () => {
    const res = await getAllGroups()
    if (res?.data?.code === 200) {
      const tempGroups = []
      for (let i = 0; i < res?.data?.data?.groups?.length; i += 1) {
        if (res?.data?.data?.groups[i]?.role === TYPE_OWNER || res?.data?.data?.groups[i]?.role === TYPE_CO_OWNER) {
          tempGroups.push(res?.data?.data?.groups[i])
        }
      }
      setGroups(tempGroups)
    }
  }

  const handlePresent = async () => {
    const res = await checkGroupPresent(selectGroup)
    if (res?.data?.status === 201 && !res?.data?.data?.isPresent) {
      navigate(`/presentations/${selectGroup}/present/${idP}/${idS}`)
    } else {
      toast.error('Nhóm này đang có người trình chiếu')
    }
  }

  React.useEffect(() => {
    getGroup()
  }, [])

  return (
    <div>
      <Button
        sx={{
          ml: 0.5,
          px: 2,
          background: teal[500],
          color: 'white',
          '&:hover': {
            background: teal[300],
          },
        }}
        onClick={handleClick}
        startIcon={<PlayArrowIcon />}
      >
        Present
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => navigate(`/presentations/present/${idP}/${idS}`)}>Trình chiếu công khai</MenuItem>
        <MenuItem
          onClick={() => {
            setIsModalOpenShare(true)
            handleClose()
          }}
        >
          Trình chiếu trong nhóm của bạn
        </MenuItem>
      </Menu>

      <Modal
        title="Chọn Nhóm để trình chiếu"
        open={isModalOpenPresentGroup}
        onCancel={() => setIsModalOpenShare(false)}
        footer={null}
      >
        <Select
          size="small"
          fullWidth
          value={selectGroup}
          onChange={(event: SelectChangeEvent) => {
            setSelectGroup(event.target.value)
          }}
        >
          {groups.map((item) => (
            <MenuItem key={item.groupId} value={item.groupId}>
              {item.groupName}
            </MenuItem>
          ))}
        </Select>
        <Button
          sx={{
            mt: 2,
            px: 2,
            background: teal[500],
            color: 'white',
            '&:hover': {
              background: teal[300],
            },
          }}
          fullWidth
          disabled={selectGroup === ''}
          onClick={handlePresent}
        >
          Trình chiếu
        </Button>
      </Modal>
    </div>
  )
}
