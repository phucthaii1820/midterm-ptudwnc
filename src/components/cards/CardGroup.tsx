import React from 'react'
import { Avatar, Box, Card, CardActions, CardContent, Divider, IconButton, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle'
import { useNavigate } from 'react-router-dom'

const CardGroup = () => {
  const navigate = useNavigate()
  return (
    <Card
      onClick={() => {
        navigate('/group/13')
      }}
      sx={{
        minWidth: 275,
        cursor: 'pointer',
        borderRadius: '8px',
        '&:hover': {
          boxShadow: '0 0 20px rgba(0,0,0,0.1)',
        },
      }}
      variant="outlined"
    >
      <Box
        sx={{
          height: '110px',
          backgroundImage: 'url("https://www.gstatic.com/classroom/themes/img_bookclub.jpg")',
          backgroundSize: 'cover',
          position: 'relative',
          color: 'white',
        }}
      >
        <Box
          sx={{
            p: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: '1.375rem',
              }}
            >
              19CLC3 - NMCNTT
            </Typography>

            <IconButton aria-label="settings">
              <MoreVertIcon
                sx={{
                  color: 'white',
                }}
              />
            </IconButton>
          </Box>
        </Box>

        <Avatar
          sx={{
            height: '75px',
            width: '75px',
            position: 'absolute',
            right: '5%',
            bottom: '-37.5px',
          }}
        />

        <Typography
          sx={{
            position: 'absolute',
            left: 0,
            bottom: 0,
          }}
          p={2}
        >
          Võ Nguyễn
        </Typography>
      </Box>
      <CardContent
        sx={{
          minHeight: '50px',
        }}
      >
        {' '}
      </CardContent>
      <Divider />
      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'end',
        }}
      >
        <IconButton aria-label="settings">
          <SupervisedUserCircleIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default CardGroup
