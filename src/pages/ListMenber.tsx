import React from 'react'
import { Box, Container, Divider, List, ListItem, Typography } from '@mui/material'
// import { useParams } from 'react-router-dom'
import { teal } from '@mui/material/colors'
import CardMenber from '../components/cards/CardMenber'
import Layout from '../components/layouts/Layout'

const ListMenber = () => {
  // const { id } = useParams()
  // console.log(id)
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
            19CLC3 - NMCNTT
          </Typography>
        </Box>

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
          {[1].map((item) => (
            <Box key={item}>
              <ListItem button>
                <CardMenber />
              </ListItem>
              <Divider />
            </Box>
          ))}
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

        <List>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <Box key={item}>
              <ListItem button>
                <CardMenber />
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
      </Container>
    </Layout>
  )
}

export default ListMenber
