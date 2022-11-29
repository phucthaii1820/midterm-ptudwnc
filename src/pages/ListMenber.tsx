import React from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { teal, grey } from '@mui/material/colors'
import { toast } from 'react-toastify'
import LogoutIcon from '@mui/icons-material/Logout'

import CardMenber from '../components/cards/CardMenber'
import Layout from '../components/layouts/Layout'
import { generateInviteLink, getGroupDetail, getInviteLinkById, leaveGroup } from '../api/group'
import { Detailgroup } from '../types/group'
import userStore from '../stores/user'
import WarningMessage from '../components/modal/WarningMessage'
import InviteByEmail from '../components/modal/InviteByEmail'

const BASE_API_FE = process.env.REACT_APP_BASE_HOST_FE

const ListMenber = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { user } = userStore()
  const [data, setData] = React.useState({} as Detailgroup)
  const [link, setLink] = React.useState('')
  const [openWarning, setOpenWarning] = React.useState(false)
  const [isPending, setIsPending] = React.useState(true)

  const getDetail = async () => {
    const res = await getGroupDetail(id)
    if (res?.data?.code === 200) {
      setData({
        ...res.data.data,
        owner: {
          ...res.data.data.owner,
          role: 'owner',
        },
      })
      setIsPending(false)
    }
    if (res?.data?.error?.code === 'permission_denied') {
      toast.error('Bạn không có quyền truy cập nhóm này')
      navigate('/')
    }
  }

  const getInviteLink = async (idD: string) => {
    const res = await getInviteLinkById(idD)

    if (res?.data?.code === 200) setLink(`${BASE_API_FE}/join-group-by-link/${res?.data?.data?.invitationLink}`)
  }

  const generateLink = async () => {
    const res = await generateInviteLink(id)

    if (res?.data?.code === 200) {
      setLink(`${BASE_API_FE}/${res?.data?.data?.invitationLink}`)
      toast.success('Generate link thành công')
    }
  }

  const handleLeaveGroup = async () => {
    const res = await leaveGroup(id)

    if (res?.data?.status === 200) {
      toast.success('Rời nhóm thành công')
      navigate('/')
    }
    if (res?.data?.status === 400) {
      toast.error('Quản trị viên không thể rời khỏi nhóm, vui lòng chuyển quyền quản trị nhóm để có thể rời nhóm')
      setOpenWarning(false)
    }
  }

  React.useEffect(() => {
    if (id) {
      getDetail()
      getInviteLink(id)
    }
  }, [id])

  return (
    <Layout>
      {isPending ? (
        <Box
          sx={{
            minHeight: '100vh',
            position: 'relative',
          }}
        >
          <CircularProgress
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              color: teal[500],
            }}
          />
        </Box>
      ) : (
        <Container
          maxWidth="md"
          sx={{
            mt: 4,
          }}
        >
          <Box
            sx={{
              height: '240px',
              backgroundImage: 'url("https://www.gstatic.com/classroom/themes/img_bookclub.jpg")',
              backgroundSize: 'cover',
              borderRadius: '8px',
              color: 'white',
              position: 'relative',
            }}
          >
            <Typography
              sx={{
                fontSize: '2rem',
                position: 'absolute',
                bottom: 0,
                left: 0,
                p: 2,
                fontWeight: 'bold',
              }}
            >
              {data?.information?.name}
            </Typography>
            <Box
              sx={{
                p: 1,
                position: 'absolute',
                top: 0,
                right: 0,
                display: 'flex',
              }}
            >
              <InviteByEmail disabled={data?.owner?.id !== user?.id} groupId={data?.information?.id} />

              <WarningMessage
                open={openWarning}
                title="Bạn có chắc chắn muốn thoát nhóm không?"
                setOpen={setOpenWarning}
                button={
                  <IconButton
                    onClick={() => {
                      setOpenWarning(true)
                    }}
                    sx={{
                      color: 'white',
                    }}
                  >
                    <LogoutIcon fontSize="large" />
                  </IconButton>
                }
                actionAgree={handleLeaveGroup}
              />
            </Box>
          </Box>

          <Grid container spacing={3} mt={1}>
            <Grid item xs={10}>
              <TextField value={link} size="small" disabled fullWidth label="link join group" />
            </Grid>
            <Grid item xs={2}>
              <Button
                sx={{
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
                disabled={user?.id !== data?.owner?.id}
                onClick={generateLink}
              >
                Generate link
              </Button>
            </Grid>
          </Grid>

          <Box
            sx={{
              mt: 4,
              color: teal[700],
            }}
          >
            <Typography
              sx={{
                fontSize: '1.5rem',
                py: 2,
              }}
            >
              Quản trị viên
            </Typography>
            <Divider
              sx={{
                borderColor: teal[700],
              }}
            />
          </Box>

          <List>
            <Box>
              <ListItem button>
                <CardMenber
                  fullName={data?.owner?.fullName}
                  email={data?.owner?.email}
                  role={data?.owner?.role}
                  id={data?.owner?.id}
                  groupId={data?.information?.id}
                  fetchData={getDetail}
                  myRole={data?.information?.currentUserRole}
                />
              </ListItem>
              <Divider />
            </Box>
          </List>

          <Box
            sx={{
              mt: 4,
              color: teal[700],
            }}
          >
            <Typography
              sx={{
                fontSize: '1.5rem',
                py: 2,
              }}
            >
              Thành viên
            </Typography>
            <Divider
              sx={{
                borderColor: teal[700],
              }}
            />
          </Box>

          {data?.members?.length > 0 ? (
            <List>
              {data?.members?.map((item) => (
                <Box key={item?.id}>
                  <ListItem button>
                    <CardMenber
                      fullName={item.fullName}
                      email={item.email}
                      role={item.role}
                      myRole={data?.information?.currentUserRole}
                      id={item.id}
                      groupId={data?.information?.id}
                      fetchData={getDetail}
                    />
                  </ListItem>
                  <Divider />
                </Box>
              ))}
            </List>
          ) : (
            <Typography my={2}>Không có thành viên nào</Typography>
          )}
        </Container>
      )}
    </Layout>
  )
}

export default ListMenber
