import React from 'react'
import { Box, Button, Container, Divider, Grid, List, ListItem, TextField, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { teal } from '@mui/material/colors'
import { toast } from 'react-toastify'

import CardMenber from '../components/cards/CardMenber'
import Layout from '../components/layouts/Layout'
import { generateInviteLink, getGroupDetail, getInviteLinkById } from '../api/group'
import { Detailgroup } from '../types/group'
import userStore from '../stores/user'

const ListMenber = () => {
  const { id } = useParams()
  const { user } = userStore()
  const [data, setData] = React.useState({} as Detailgroup)
  const [link, setLink] = React.useState('')

  const getDetail = async (idD: string) => {
    const res = await getGroupDetail(idD)
    if (res?.data?.code === 200)
      setData({
        ...res.data.data,
        owner: {
          ...res.data.data.owner,
          role: 'owner',
        },
      })
  }

  const getInviteLink = async (idD: string) => {
    const res = await getInviteLinkById(idD)

    if (res?.data?.code === 200) setLink(res?.data?.data?.invitationLink)
  }

  const generateLink = async () => {
    const res = await generateInviteLink(id)

    if (res?.data?.code === 200) toast.success('Generate link thành công')
  }

  React.useEffect(() => {
    if (id) {
      getDetail(id)
      getInviteLink(id)
    }
  }, [id])

  console.log(data?.owner?.role)

  return (
    <Layout>
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
              <CardMenber fullName={data?.owner?.fullName} email={data?.owner?.email} role={data?.owner?.role} />
            </ListItem>
            <Divider />
          </Box>
        </List>

        {/* <Box
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
            Đồng quản trị viên
          </Typography>
          <Divider
            sx={{
              borderColor: teal[700],
            }}
          />
        </Box>

        <List>
          {[1, 2, 3, 4].map((item) => (
            <Box key={item}>
              <ListItem button>
                <CardMenber />
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List> */}

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

        {data?.menber?.length > 0 ? (
          <List>
            {data?.menber?.map((item) => (
              <Box key={item?.id}>
                <ListItem button>
                  <CardMenber fullName={item.fullName} email={item.email} role={item.role} />
                </ListItem>
                <Divider />
              </Box>
            ))}
          </List>
        ) : (
          <Typography my={2}>Không có thành viên nào</Typography>
        )}
      </Container>
    </Layout>
  )
}

export default ListMenber
