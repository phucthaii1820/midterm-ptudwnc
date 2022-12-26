import React from 'react'
import { Box, Typography } from '@mui/material'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { teal } from '@mui/material/colors'

import { PropCardContentSlide } from 'types/card'
import { TYPE_HEADING, TYPE_MULTIPLE_CHOICE, TYPE_PARAGRAPH } from 'consts/slide'

const CardContentSlide = ({ title, options, type, content }: PropCardContentSlide) => {
  return (
    <Box
      sx={{
        padding: '50px',
      }}
    >
      <Box
        sx={{
          height: '550px',
          width: '100%',
          backgroundColor: 'white',
          padding: 2,
          position: 'relative',
        }}
      >
        {type === TYPE_MULTIPLE_CHOICE && (
          <Box>
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
            <ResponsiveContainer width="100%" aspect={5.0 / 3.0} height="100%">
              <BarChart data={options}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="content" />
                <YAxis />
                <Tooltip />
                {/* <Legend /> */}
                <Bar dataKey="chooseNumber" fill={teal[500]} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        )}

        {type === TYPE_HEADING && (
          <Box
            sx={{
              position: 'absolute',
              top: 'calc(50% - 100px)',
              width: '100%',
              left: 0,
            }}
          >
            <Typography
              mb={2}
              variant="h4"
              sx={{
                textAlign: 'center',
                fontWeight: 700,
                whiteSpace: 'nowrap',
              }}
            >
              {title}
            </Typography>
            <Typography
              mb={2}
              variant="h6"
              sx={{
                textAlign: 'center',
                fontWeight: 700,
                whiteSpace: 'nowrap',
              }}
            >
              {content}
            </Typography>
          </Box>
        )}

        {type === TYPE_PARAGRAPH && (
          <Box
            sx={{
              position: 'absolute',
              top: 'calc(50% - 100px)',
              width: '100%',
              left: 0,
            }}
          >
            <Typography
              mb={2}
              variant="h4"
              sx={{
                textAlign: 'center',
                fontWeight: 700,
                whiteSpace: 'nowrap',
              }}
            >
              {title}
            </Typography>
            <Typography
              mb={2}
              sx={{
                textAlign: 'center',
              }}
            >
              {content}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default CardContentSlide
