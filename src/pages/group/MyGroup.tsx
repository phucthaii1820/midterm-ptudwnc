import React from 'react'
import { Box, Container, Grid, Skeleton, Typography } from '@mui/material'
import CardGroup from '../../components/cards/CardGroup'
import Layout from '../../components/layouts/Layout'
import { getMyGroup } from '../../api/group'
import { Group } from '../../types/group'

const MyGroup = () => {
  const [groups, setGroups] = React.useState([] as Group[])
  const [isPending, setIsPending] = React.useState(true)

  const getGroup = async () => {
    const res = await getMyGroup()
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
          <Box>
            <Grid container spacing={2}>
              {groups?.map((item) => (
                <Grid key={item?.groupId} item md={4} lg={3} xl={2.4}>
                  <CardGroup groupId={item?.groupId} groupName={item?.groupName} ownerName={item?.ownerName} />
                </Grid>
              ))}
            </Grid>
            {groups?.length === 0 && (
              <Typography textAlign="center" mt={2}>
                Bạn chưa tham gia nhóm nào.
              </Typography>
            )}
          </Box>
        )}
      </Container>
    </Layout>
  )
}

export default MyGroup
