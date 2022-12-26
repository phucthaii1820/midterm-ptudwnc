import { Box, Container, Grid, IconButton, Typography } from '@mui/material'
import { teal } from '@mui/material/colors'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import io from 'socket.io-client'
import { PrropsSlideSocket } from 'types/presentation'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CloseIcon from '@mui/icons-material/Close'

const BASE_API = process.env.REACT_APP_BASE_HOST
const socket = io(BASE_API?.toString() || 'http://localhost:3000')

const Present = () => {
  const navigate = useNavigate()
  const { idP, idS } = useParams()
  const [data, setData] = React.useState<PrropsSlideSocket>({
    options: [
      {
        content: '',
        chooseNumber: 0,
        index: 0,
      },
    ],
    title: '',
  })

  React.useEffect(() => {
    socket.emit('join room', idP, idS, (options: PrropsSlideSocket) => {
      setData(options)
    })

    socket.on('stat', (options: PrropsSlideSocket) => {
      setData(options)
    })
  }, [])

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          padding: '50px',
        }}
      >
        <Box
          sx={{
            height: '100%',
            width: '100%',
            backgroundColor: 'white',
            padding: 2,
            position: 'relative',
          }}
        >
          <IconButton
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
            }}
          >
            <CloseIcon
              sx={{
                fontSize: 40,
              }}
              onClick={() => navigate(`/presentation/detail/${idP}`)}
            />
          </IconButton>
          <Typography
            mb={2}
            variant="h5"
            sx={{
              textAlign: 'center',
              fontWeight: 700,
            }}
          >
            {data.title}
          </Typography>
          <Grid
            container
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Grid item xs={0.5}>
              <IconButton>
                <ChevronLeftIcon
                  sx={{
                    fontSize: 60,
                  }}
                />
              </IconButton>
            </Grid>
            <Grid item xs={11}>
              <ResponsiveContainer width="100%" aspect={5.0 / 3.0} height="100%">
                <BarChart data={data.options}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="content" />
                  <YAxis />
                  <Tooltip />
                  {/* <Legend /> */}
                  <Bar dataKey="chooseNumber" fill={teal[500]} />
                </BarChart>
              </ResponsiveContainer>
            </Grid>
            <Grid item xs={0.5}>
              <IconButton>
                <ChevronRightIcon
                  sx={{
                    fontSize: 60,
                  }}
                />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Present
