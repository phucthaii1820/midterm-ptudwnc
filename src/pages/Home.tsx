import React from 'react'
import { Container, Grid } from '@mui/material'
import CardGroup from '../components/cards/CardGroup'
import Layout from '../components/layouts/Layout'

const Home = () => {
  return (
    <Layout>
      <Container
        maxWidth="xl"
        sx={{
          mt: 4,
        }}
      >
        <Grid container spacing={2}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <Grid key={item} item md={4} lg={3} xl={2.4}>
              <CardGroup />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  )
}

export default Home
