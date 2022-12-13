import React from 'react'
import { Box, Typography } from '@mui/material'
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'
import { teal } from '@mui/material/colors'

import { PropCardContentSlide } from '../../types/card'

const CardContentSlide = ({ title, options }: PropCardContentSlide) => {
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
        <BarChart width={830} height={520} data={options}>
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

export default CardContentSlide
