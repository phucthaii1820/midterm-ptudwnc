/* eslint-disable react/jsx-boolean-value */
import React from 'react'
import { Box, Button, Container, Divider, Grid, IconButton, Typography } from '@mui/material'
import { grey, teal } from '@mui/material/colors'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ShareIcon from '@mui/icons-material/Share'
import AddIcon from '@mui/icons-material/Add'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { useNavigate } from 'react-router-dom'

import Layout from '../../components/layouts/Layout'
import CardSlide from '../../components/cards/CardSlide'
import CardContentSlide from '../../components/cards/CardContentSlide'
import CardSettingSlide from '../../components/cards/CardSettingSlide'

const DetailPresetation = () => {
  const navigate = useNavigate()
  return (
    <Layout>
      <Container
        maxWidth="xl"
        sx={{
          mt: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBackIcon />
            </IconButton>
            <Box
              sx={{
                ml: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: '13px',
                  fontWeight: 700,
                }}
              >
                Bài thuyết trình 1
              </Typography>
              <Typography
                sx={{
                  fontSize: '13px',
                  color: grey[500],
                }}
              >
                Tạo bởi phucthai0108
              </Typography>
            </Box>
          </Box>

          <Box>
            <Button
              sx={{
                mx: 0.5,
                px: 2,
                background: grey[500],
                color: 'white',
                '&:hover': {
                  background: grey[400],
                },
              }}
              startIcon={<ShareIcon />}
            >
              Chia sẻ
            </Button>

            <Button
              sx={{
                ml: 0.5,
                px: 2,
                background: teal[500],
                color: 'white',
                '&:hover': {
                  background: teal[300],
                },
              }}
              startIcon={<PlayArrowIcon />}
            >
              Present
            </Button>
          </Box>
        </Box>
        <Divider />
        <Box
          my={1}
          sx={{
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          <Button
            sx={{
              px: 2,
              background: teal[500],
              color: 'white',
              '&:hover': {
                background: teal[300],
              },
            }}
            startIcon={<AddIcon />}
          >
            Tạo slide
          </Button>
        </Box>
        <Divider />
        <Grid
          container
          sx={{
            minHeight: 'calc(100vh - 197.5px)',
          }}
        >
          <Grid item xs={2}>
            <Box
              sx={{
                height: '100%',
                width: '100%',
              }}
            >
              <CardSlide isSelect={true} index={1} nameSlide="Slide 1" />
              <CardSlide isSelect={false} index={2} nameSlide="Slide 2" />
            </Box>
          </Grid>
          <Grid item xs={7.5}>
            <Box
              sx={{
                height: '100%',
                width: '100%',
                background: grey[200],
              }}
            >
              <CardContentSlide />
            </Box>
          </Grid>
          <Grid item xs={2.5}>
            <Box
              sx={{
                height: '100%',
                width: '100%',
              }}
            >
              <CardSettingSlide />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}

export default DetailPresetation
