import React from 'react'
import { Box, Typography } from '@mui/material'
import { grey, teal } from '@mui/material/colors'
import BarChartIcon from '@mui/icons-material/BarChart'

import { CardSlideProps } from '../../types/card'

const CardSlide = ({ isSelect, index, nameSlide }: CardSlideProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '120px',
        display: 'flex',
        backgroundColor: isSelect ? grey[200] : 'white',
        cursor: 'pointer',
        ':hover': {
          background: grey[200],
        },
      }}
    >
      <Box m={1}>
        <Typography fontWeight={700}>{index}</Typography>
      </Box>
      <Box
        m={1}
        sx={{
          width: '100%',
          border: isSelect ? `2px solid ${teal[200]}` : `1px solid ${grey[400]}`,
          borderRadius: '4px',
          position: 'relative',
          background: 'white',
          ':hover': {
            background: grey[200],
          },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <BarChartIcon sx={{ fontSize: '30px', color: grey[500] }} />
          <Typography
            sx={{
              fontSize: '13px',
            }}
          >
            {nameSlide}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default CardSlide
