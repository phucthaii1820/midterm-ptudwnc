import React from 'react'
import { Box, Typography } from '@mui/material'
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'
import { teal } from '@mui/material/colors'

const dataChart = [
  {
    name: 'Page a',
    uv: 4001,
  },
  {
    name: 'Page B',
    uv: 3000,
  },
  {
    name: 'Page C',
    uv: 2000,
  },
]

const CardContentSlide = () => {
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
          Slide 1
        </Typography>
        <BarChart width={830} height={520} data={dataChart}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="uv" fill={teal[500]} />
        </BarChart>
      </Box>
    </Box>
  )
}

export default CardContentSlide
