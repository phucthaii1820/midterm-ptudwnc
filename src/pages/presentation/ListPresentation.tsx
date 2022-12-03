import React from 'react'
import { Box, Button, Container, Typography } from '@mui/material'
import { teal } from '@mui/material/colors'
import { Table } from 'antd'
import { useNavigate } from 'react-router-dom'

import Layout from '../../components/layouts/Layout'

interface Presentation {
  key: number
  namePresentation: string
  userCreate: string
  createdAt: string
  updatedAt: string
}

const dataSource: Presentation[] = [
  {
    key: 1,
    namePresentation: 'Bài thuyết trình 1',
    userCreate: 'phucthai0108',
    createdAt: '10/10/2021',
    updatedAt: '10/10/2021',
  },
]

const columns = [
  {
    title: 'Tên thuyết trình',
    dataIndex: 'namePresentation',
    key: 'namePresentation',
    render: (_: Presentation, dataPresentation: Presentation) => (
      <Typography
        sx={{
          color: teal[500],
          cursor: 'pointer',
        }}
      >
        {dataPresentation.namePresentation}
      </Typography>
    ),
  },
  {
    title: 'Người tạo',
    dataIndex: 'userCreate',
    key: 'userCreate',
  },
  {
    title: 'Thời gian tạo',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'Thời gian sửa',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
]

const ListPresentation = () => {
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
          }}
        >
          <Typography
            variant="h5"
            sx={{
              textTransform: 'uppercase',
              color: teal[500],
              fontWeight: 700,
            }}
          >
            Thuyết trình
          </Typography>
          <Button
            sx={{
              px: 2,
              background: teal[500],
              color: 'white',
              '&:hover': {
                background: teal[300],
              },
            }}
          >
            Tạo thuyết trình
          </Button>
        </Box>

        <Box mt={4}>
          <Table
            onRow={(record) => {
              return {
                onClick: () => {
                  navigate(`/presentation/detail/${record.key}`)
                },
              }
            }}
            dataSource={dataSource}
            columns={columns}
            pagination={false}
          />
        </Box>
      </Container>
    </Layout>
  )
}

export default ListPresentation
