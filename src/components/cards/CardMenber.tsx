import React from 'react'
import { Avatar, Grid, Typography } from '@mui/material'

const CardMenber = () => {
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Grid item xs={1}>
        <Avatar
          sx={{
            height: '50px',
            width: '50px',
          }}
        />
      </Grid>

      <Grid item xs={8}>
        <Typography
          sx={{
            fontWeight: 'bold',
          }}
        >
          Thái Trần Hồng Phúc
        </Typography>
      </Grid>
    </Grid>
  )
}

export default CardMenber
