import React from 'react'
import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import { teal } from '@mui/material/colors'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import Layout from '../../components/layouts/Layout'
import { createGroups } from '../../api/group'

const CreateGroup = () => {
  const [groupName, setGroupName] = React.useState('')
  const [isPending, setIsPending] = React.useState(false)
  const navigate = useNavigate()

  const createGroup = async () => {
    setIsPending(true)
    if (groupName === '') {
      toast.error('Tên nhóm không được để trống')
      return
    }
    const res = await toast.promise(createGroups({ name: groupName }), {
      pending: 'Đang tạo nhóm',
      success: 'Tạo nhóm thành công',
      error: 'Tạo nhóm thất bại',
    })
    setIsPending(false)
    if (res.status === 201) navigate('/')
  }
  return (
    <Layout>
      <Container
        maxWidth="md"
        sx={{
          mt: 4,
        }}
      >
        <Typography variant="h4" textTransform="uppercase" textAlign="center">
          Tạo nhóm
        </Typography>
        <Grid container mt={4} spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Tên nhóm"
              fullWidth
              value={groupName}
              onChange={(e) => {
                setGroupName(e.target.value)
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container justifyContent="flex-end">
              <Grid item xs={3} display="flex" justifyContent="flex-end">
                <Button
                  sx={{
                    py: 1,
                    px: 4,
                    background: teal[400],
                    color: 'white',
                    '&:hover': {
                      background: teal[300],
                    },
                  }}
                  onClick={createGroup}
                  disabled={isPending}
                >
                  Tạo
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}

export default CreateGroup
