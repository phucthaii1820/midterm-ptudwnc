import React from 'react'
import { Container, Grid } from '@mui/material'
import CardGroup from '../../components/cards/CardGroup'
import Layout from '../../components/layouts/Layout'
import { getGroupJoined } from '../../api/group'
import { Group } from '../../types/group'

const GroupJoined = () => {
  const [groups, setGroups] = React.useState([] as Group[])
  const getGroup = async () => {
    const res = await getGroupJoined()
    if (res?.data?.code === 200) setGroups(res?.data?.data?.groups)
  }

  React.useEffect(() => {
    getGroup()
  }, [])

  return (
    <Layout>
      <Container
        maxWidth="xl"
        sx={{
          mt: 4,
        }}
      >
        <Grid container spacing={2}>
          {groups?.map((item) => (
            <Grid key={item?.groupId} item md={4} lg={3} xl={2.4}>
              <CardGroup groupId={item?.groupId} groupName={item?.groupName} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  )
}

export default GroupJoined
