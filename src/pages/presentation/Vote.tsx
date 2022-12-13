/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Box, Button, Grid, List, Typography } from '@mui/material'
import { grey, teal } from '@mui/material/colors'
import { useParams } from 'react-router-dom'
import io from 'socket.io-client'
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'

import { PrropsSlideSocket } from '../../types/presentation'
import Loading from '../../components/Loading'

const BASE_API = process.env.REACT_APP_BASE_HOST
const socket = io(BASE_API?.toString() || 'http://localhost:3000')

const Vote = () => {
  const { idP, idS } = useParams()
  const [valueSeclect, setValueSeclect] = React.useState<number>(0)
  const [data, setData] = React.useState<PrropsSlideSocket>()
  const [isPending, setIsPending] = React.useState<boolean>(true)
  const [disabledChoose, setDisabledChoose] = React.useState<boolean>(false)

  React.useEffect(() => {
    socket.emit('join room', idP, idS, (options: PrropsSlideSocket) => {
      setData(options)
      setIsPending(false)
    })

    socket.on('stat', (options: PrropsSlideSocket) => {
      setData(options)
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('stat')
    }
  }, [])

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      {isPending ? (
        <Box
          sx={{
            minHeight: 'calc(100vh - 200px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Loading />
        </Box>
      ) : (
        <Box
          sx={{
            width: '80%',
            height: '700px',
            backgroundColor: 'white',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Grid container>
            <Grid item xs={8}>
              <Typography variant="h5" textAlign="center" fontWeight={700}>
                {data?.title}
              </Typography>
              <BarChart
                width={850}
                height={720}
                data={data?.options}
                style={{
                  width: '100%',
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="content" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="chooseNumber" fill={teal[500]} />
              </BarChart>
            </Grid>
            <Grid item xs={4}>
              <Typography textAlign="center" fontWeight={700}>
                CHỌN ĐÁP ÁN
              </Typography>
              <List>
                {data?.options.map((item) => (
                  <Button
                    key={item.index}
                    fullWidth
                    sx={{
                      my: 0.5,
                      border: `1px solid ${grey[500]}`,
                      borderRadius: '5px',
                      color: valueSeclect === item.index ? 'white' : 'black',
                      backgroundColor: valueSeclect === item.index ? grey[500] : 'white',

                      '&:hover': {
                        backgroundColor: grey[500],
                        color: 'white',
                      },
                    }}
                    onClick={() => {
                      setValueSeclect(item.index)
                    }}
                  >
                    {item.content}
                  </Button>
                ))}

                <Button
                  fullWidth
                  sx={{
                    my: 2,
                    backgroundColor: teal[500],
                    color: 'white',
                    '&:hover': {
                      backgroundColor: teal[300],
                      color: 'white',
                    },
                    '&:disabled': {
                      backgroundColor: grey[500],
                      color: 'white',
                    },
                  }}
                  disabled={valueSeclect === 0 || disabledChoose}
                  onClick={() => {
                    setDisabledChoose(true)
                    socket.emit('choose', idP, idS, valueSeclect, (options: PrropsSlideSocket) => {
                      setData(options)
                    })
                  }}
                >
                  Gửi đáp án
                </Button>
              </List>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  )
}

export default Vote
