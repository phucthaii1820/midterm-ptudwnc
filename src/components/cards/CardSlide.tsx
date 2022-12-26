/* eslint-disable react/self-closing-comp */
import React from 'react'
import { Box, Typography } from '@mui/material'
import { grey, teal } from '@mui/material/colors'
import BarChartIcon from '@mui/icons-material/BarChart'

import { CardSlideProps } from 'types/card'
import { TYPE_HEADING, TYPE_MULTIPLE_CHOICE, TYPE_PARAGRAPH } from 'consts/slide'

const CardSlide = ({ isSelect, index, id, hanldeClick, type, nameSlide }: CardSlideProps) => {
  console.log(type)

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
        onClick={() => hanldeClick(id)}
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
          {type === TYPE_MULTIPLE_CHOICE && <BarChartIcon sx={{ fontSize: '30px', color: grey[500] }} />}
          {type === TYPE_HEADING && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: '50px',
                  height: '10px',
                  background: 'black',
                }}
              ></Box>
              <Box
                sx={{
                  width: '40px',
                  height: '5px',
                  background: 'gray',
                  mt: '1px',
                }}
              ></Box>
            </Box>
          )}

          {type === TYPE_PARAGRAPH && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: '40px',
                  height: '5px',
                  background: 'gray',
                }}
              ></Box>
              <Box
                sx={{
                  width: '50px',
                  height: '10px',
                  background: 'black',
                  mt: '1px',
                }}
              ></Box>
            </Box>
          )}

          <Typography fontWeight={700} sx={{ mt: '8px', fontSize: 10 }}>
            {nameSlide}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default CardSlide
