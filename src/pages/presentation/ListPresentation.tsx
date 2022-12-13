/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { red, teal } from '@mui/material/colors'
import { Modal, Space, Table } from 'antd'
import { toast } from 'react-toastify'
import moment from 'moment'
import 'moment/locale/vi'
import { Link } from 'react-router-dom'

import Layout from '../../components/layouts/Layout'
import { createPresentation, deletePresentation, getPresentation, updatePresentation } from '../../api/presentation'
import { PropsPresentation, PropsPresentationResponse } from '../../types/presentation'
import userStore from '../../stores/user'
import Loading from '../../components/Loading'
import { ModalUpdatePresentationProps } from '../../types/Modal'

moment.locale('vi')

const ModalUpdatePresentation = ({
  namePresentation,
  handleUpdatePresentation,
  isDelete,
  fetchData,
}: ModalUpdatePresentationProps) => {
  const [namePresentationUpdate, setNamePresentationUpdate] = React.useState(namePresentation)
  const [openUpdate, setOpenUpdate] = React.useState(false)

  const handleOk = async () => {
    await handleUpdatePresentation(namePresentationUpdate)
    setOpenUpdate(false)
    await fetchData()
  }

  return (
    <Box>
      <Button
        disabled={!isDelete}
        sx={{
          px: 2,
          background: teal[500],
          color: 'white',
          '&:hover': {
            background: teal[400],
          },
          '&:disabled': {
            background: 'gray',
            color: 'white',
          },
        }}
        onClick={() => setOpenUpdate(true)}
      >
        Cập nhật
      </Button>
      <Modal
        title="Sửa thuyết trình"
        open={openUpdate}
        onOk={handleOk}
        onCancel={() => {
          setOpenUpdate(false)
        }}
        okText="Lưu"
        cancelText="Hủy"
      >
        <TextField
          fullWidth
          placeholder="Nhập tên thuyết trình"
          size="small"
          value={namePresentationUpdate}
          onChange={(e) => {
            setNamePresentationUpdate(e.target.value)
          }}
        />
      </Modal>
    </Box>
  )
}
const columns = [
  {
    title: 'Tên thuyết trình',
    dataIndex: 'namePresentation',
    key: 'namePresentation',
    render: (_: PropsPresentation, dataPresentation: PropsPresentation) => (
      <Link to={`/presentation/detail/${dataPresentation.presentationId}`}>
        <Typography
          sx={{
            color: teal[500],
            cursor: 'pointer',
          }}
        >
          {dataPresentation.namePresentation}
        </Typography>
      </Link>
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
    render: (createAt: string) => moment(createAt).fromNow(),
  },
  {
    title: 'Thời gian sửa',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    render: (updateAt: string) => moment(updateAt).fromNow(),
  },
  {
    title: 'Tùy chọn',
    dataIndex: 'ownerId',
    key: 'ownerId',
    render: (_: PropsPresentation, dataPresentation: PropsPresentation) => {
      return (
        <Box>
          <Space>
            <Button
              disabled={!dataPresentation.isDelete}
              onClick={async () => {
                await dataPresentation.handleDeletePresentation()
                await dataPresentation.fetchData()
              }}
              sx={{
                px: 2,
                background: red[500],
                color: 'white',
                '&:hover': {
                  background: red[400],
                },
                '&:disabled': {
                  background: 'gray',
                  color: 'white',
                },
              }}
            >
              Xóa
            </Button>

            <ModalUpdatePresentation
              namePresentation={dataPresentation.namePresentation}
              handleUpdatePresentation={dataPresentation.handleUpdatePresentation}
              isDelete={dataPresentation.isDelete}
              fetchData={dataPresentation.fetchData}
            />
          </Space>
        </Box>
      )
    },
  },
]

const ListPresentation = () => {
  const { user } = userStore()
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [namePresentationCreate, setNamePresentationCreate] = React.useState('')
  const [data, setData] = React.useState<PropsPresentation[]>()
  const [isPending, setIsPending] = React.useState(true)

  const handleDeletePresentation = async (presentationId: string) => {
    const response = await deletePresentation(presentationId)
    if (response?.data?.status === 200) {
      toast.success('Xóa thành công')
    } else {
      toast.error('Xóa thất bại')
    }
  }

  const handleUpdatePresentation = async (presentationId: string, name: string) => {
    const response = await updatePresentation(presentationId, name)
    if (response?.data?.status === 200) {
      toast.success('Cập nhật thành công')
    } else {
      toast.error('Cập nhật thất bại')
    }
  }

  const fetchData = async () => {
    const res = await getPresentation()
    if (res?.data?.code === 200) {
      setData(
        res?.data?.data?.presentations?.map((item: PropsPresentationResponse) => ({
          ...item,
          namePresentation: item.presentationName,
          key: item.presentationId,
          userCreate: item.ownerName,
          isDelete: user?.id === item.ownerId,
          handleDeletePresentation: () => handleDeletePresentation(item.presentationId),
          handleUpdatePresentation: (name: string) => handleUpdatePresentation(item.presentationId, name),
          fetchData: () => fetchData(),
        })),
      )
      setIsPending(false)
    }
  }
  const handleOk = async () => {
    if (namePresentationCreate === '') {
      toast.error('Tên thuyết trình không được để trống')
      return
    }

    const res = await createPresentation({ name: namePresentationCreate })

    if (res?.data?.status === 201) {
      toast.success('Tạo thuyết trình thành công')
      fetchData()
      setIsModalOpen(false)
      setNamePresentationCreate('')
    } else {
      toast.error('Tạo thuyết trình thất bại')
    }
  }

  React.useEffect(() => {
    fetchData()
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
          <Box
            sx={{
              minHeight: 'calc(100vh - 200px)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Loading />
          </Box>
        ) : (
          <Box>
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
                onClick={() => setIsModalOpen(true)}
              >
                Tạo thuyết trình
              </Button>
            </Box>

            <Box mt={4}>
              <Table dataSource={data} columns={columns} pagination={false} />
            </Box>
            <Modal
              title="Tạo Thuyết trình"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={() => {
                setIsModalOpen(false)
              }}
              okText="Tạo thuyết trình"
              cancelText="Hủy"
            >
              <TextField
                fullWidth
                placeholder="Nhập tên thuyết trình"
                size="small"
                value={namePresentationCreate}
                onChange={(e) => {
                  setNamePresentationCreate(e.target.value)
                }}
              />
            </Modal>
          </Box>
        )}
      </Container>
    </Layout>
  )
}

export default ListPresentation
