/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Box, Typography } from '@mui/material'
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'
import { teal } from '@mui/material/colors'

import { PropCardContentSlide } from '../../types/card'
import { PrropsSlideSocket } from '../../types/presentation'

const CardContentSlidePresent = ({ title, isConnectSocket, socket, idPresentation, idSlide }: PropCardContentSlide) => {
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
    if (isConnectSocket) {
      socket.emit('join room', idPresentation, idSlide, (options: PrropsSlideSocket) => {
        setData(options)
      })

      socket.on('stat', (options: PrropsSlideSocket) => {
        setData(options)
      })
    }
  }, [isConnectSocket])

  return (
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
        }}
      >
        <Typography
          mb={2}
          variant="h5"
          sx={{
            textAlign: 'center',
            fontWeight: 700,
          }}
        >
          {title}
        </Typography>
        <BarChart
          width={1580}
          height={820}
          data={data.options}
          style={{
            width: '100%',
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="content" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="chooseNumber" fill={teal[500]} />
        </BarChart>
      </Box>
    </Box>
  )
}

export default CardContentSlidePresent
