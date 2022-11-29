import React from 'react'
import { Container, Grid, Skeleton } from '@mui/material'
import CardGroup from '../../components/cards/CardGroup'
import Layout from '../../components/layouts/Layout'
import { getGroupJoined } from '../../api/group'
import { Group } from '../../types/group'

const GroupJoined = () => {
  const [groups, setGroups] = React.useState([] as Group[])
  const [isPending, setIsPending] = React.useState(true)

  const getGroup = async () => {
    const res = await getGroupJoined()
    if (res?.data?.code === 200) setGroups(res?.data?.data?.groups)
    setIsPending(false)
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
        {isPending ? (
          <Grid container spacing={2}>
            {[1, 2, 3, 4]?.map((item) => (
              <Grid key={item} item md={4} lg={3} xl={2.4}>
                <Skeleton
                  variant="rectangular"
                  sx={{
                    width: '100%',
                    height: 251,
                    borderRadius: '8px',
                  }}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={2}>
            {groups?.map((item) => (
              <Grid key={item?.groupId} item md={4} lg={3} xl={2.4}>
                <CardGroup groupId={item?.groupId} groupName={item?.groupName} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Layout>
  )
}

export default GroupJoined
