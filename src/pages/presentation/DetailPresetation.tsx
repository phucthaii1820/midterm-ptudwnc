/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-boolean-value */
import React from 'react'
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from '@mui/material'
import { grey, red, teal } from '@mui/material/colors'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ShareIcon from '@mui/icons-material/Share'
import AddIcon from '@mui/icons-material/Add'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { useNavigate, useParams } from 'react-router-dom'
import { Modal, Space } from 'antd'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { toast } from 'react-toastify'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import DeleteIcon from '@mui/icons-material/Delete'
import io from 'socket.io-client'

import Layout from '../../components/layouts/Layout'
import CardSlide from '../../components/cards/CardSlide'
import CardContentSlide from '../../components/cards/CardContentSlide'
import CardSettingSlide from '../../components/cards/CardSettingSlide'
import { createSlide, deleteSlide, getSlideOfPresent } from '../../api/presentation'
import { PropsPresentDetail, PropsSlide } from '../../types/presentation'
import Loading from '../../components/Loading'
import CardContentSlidePresent from '../../components/cards/CardContentSlidePresent'

const BASE_API = process.env.REACT_APP_BASE_HOST
const BASE_HOST = process.env.REACT_APP_BASE_HOST_FE
const socket = io(BASE_API?.toString() || 'http://localhost:3000')

const DetailPresetation = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [dataPresentation, setDataPresentation] = React.useState<PropsPresentDetail>()
  const [isLoadingCreateSlide, setIsLoadingCreateSlide] = React.useState(false)
  const [isLoadingDeleteSlide, setIsLoadingDeleteSlide] = React.useState(false)
  const [isPending, setIsPending] = React.useState(true)
  const [isModalOpenShare, setIsModalOpenShare] = React.useState(false)
  const [isConnectSocket, setIsConnectSocket] = React.useState(false)
  const handle = useFullScreenHandle()

  const handleGetPresentation = async () => {
    const res = await getSlideOfPresent(id)

    if (res?.data?.code === 200) {
      setDataPresentation({
        ...res?.data?.data,
        slides: res?.data?.data?.slides?.map((item: PropsSlide, index: number) => {
          if (index === 0) {
            return {
              ...item,
              isSelect: true,
            }
          }
          return {
            ...item,
            isSelect: false,
          }
        }),
      })
      setIsPending(false)
    }
  }

  const handleCreateSlide = async () => {
    setIsLoadingCreateSlide(true)
    await createSlide(id, '', [''])
    handleGetPresentation()
    setIsLoadingCreateSlide(false)
  }

  const handleDeleteSlide = async () => {
    setIsLoadingDeleteSlide(true)
    if (dataPresentation?.slides?.length === 1) {
      toast.error('Không thể xóa slide cuối cùng')
      setIsLoadingDeleteSlide(false)
      return
    }
    const res = await deleteSlide(
      dataPresentation?.presentationId,
      dataPresentation?.slides?.filter((item: PropsSlide) => item.isSelect === true)[0]?.id,
    )
    if (res?.data?.status === 200) {
      toast.success('Xóa thành công')
      handleGetPresentation()
    }
    setIsLoadingDeleteSlide(false)
  }

  const handleClickSlide = (idS: string) => {
    setDataPresentation((preState: any) => {
      const data = preState?.slides
      const newData = data?.map((item: PropsSlide) => {
        if (item.id === idS) {
          return {
            ...item,
            isSelect: true,
          }
        }
        return {
          ...item,
          isSelect: false,
        }
      })
      return {
        ...preState,
        slides: newData,
      }
    })
  }

  React.useEffect(() => {
    if (id && !isConnectSocket) {
      handleGetPresentation()
    }
  }, [id, isConnectSocket])

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
                    {dataPresentation?.presentationName}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '13px',
                      color: grey[500],
                    }}
                  >
                    Tạo bởi {dataPresentation?.presentationOwnerName}
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
                  onClick={() => setIsModalOpenShare(true)}
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
                  onClick={handle.enter}
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
              <Space>
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
                  onClick={handleCreateSlide}
                  disabled={isLoadingCreateSlide}
                >
                  Tạo slide
                </Button>
                <Button
                  sx={{
                    px: 2,
                    background: red[500],
                    color: 'white',
                    '&:hover': {
                      background: red[300],
                    },
                  }}
                  startIcon={<DeleteIcon />}
                  onClick={handleDeleteSlide}
                  disabled={isLoadingDeleteSlide}
                >
                  Xóa slide
                </Button>
              </Space>
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
                  {dataPresentation?.slides?.map((item, index) => (
                    <CardSlide
                      isSelect={item.isSelect}
                      index={index + 1}
                      nameSlide={item.title}
                      key={item.id}
                      id={item.id}
                      hanldeClick={handleClickSlide}
                    />
                  ))}
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
                  <CardContentSlide
                    title={dataPresentation?.slides?.filter((item: PropsSlide) => item.isSelect === true)[0]?.title}
                    options={dataPresentation?.slides?.filter((item: PropsSlide) => item.isSelect === true)[0]?.options}
                    isConnectSocket={isConnectSocket}
                    socket={socket}
                    idSlide={
                      dataPresentation?.slides?.filter((item: PropsSlide) => item.isSelect === true)[0]?.id || ''
                    }
                    idPresentation={id || ''}
                  />
                </Box>
              </Grid>
              <Grid item xs={2.5}>
                <Box
                  sx={{
                    height: '100%',
                    width: '100%',
                  }}
                >
                  <CardSettingSlide
                    title={
                      dataPresentation?.slides?.filter((item: PropsSlide) => item.isSelect === true)[0]?.title
                        ? dataPresentation?.slides?.filter((item: PropsSlide) => item.isSelect === true)[0]?.title
                        : ''
                    }
                    options={
                      dataPresentation?.slides?.filter((item: PropsSlide) => item.isSelect === true)[0]?.options || []
                    }
                    dataPresentation={dataPresentation}
                    idSlide={
                      dataPresentation?.slides?.filter((item: PropsSlide) => item.isSelect === true)[0]?.id || ''
                    }
                    setDataPresentation={setDataPresentation}
                    fetchData={handleGetPresentation}
                  />
                </Box>
              </Grid>
            </Grid>
            <Modal title="Chia sẻ" open={isModalOpenShare} onCancel={() => setIsModalOpenShare(false)} footer={null}>
              <Box
                sx={{
                  display: 'flex',
                }}
              >
                <OutlinedInput
                  fullWidth
                  size="small"
                  value={`${BASE_HOST}/presentations/vote/${id}/${
                    dataPresentation?.slides?.filter((item: PropsSlide) => item.isSelect === true)[0]?.id
                  }`}
                  disabled
                  sx={{
                    mt: 1,
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `${BASE_HOST}/presentations/vote/${id}/${
                              dataPresentation?.slides?.filter((item: PropsSlide) => item.isSelect === true)[0]?.id
                            }`,
                          )
                          toast.success('Đã copy link')
                        }}
                      >
                        <ContentCopyIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Box>
            </Modal>

            <FullScreen
              handle={handle}
              onChange={(state) => {
                setIsConnectSocket(state)
              }}
            >
              <Box
                sx={{
                  height: '100vh',
                  width: '100vw',
                  background: grey[200],
                  display: handle.active ? null : 'none',
                }}
              >
                <Box
                  sx={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                  }}
                >
                  <CardContentSlidePresent
                    title={dataPresentation?.slides?.filter((item: PropsSlide) => item.isSelect === true)[0]?.title}
                    options={dataPresentation?.slides?.filter((item: PropsSlide) => item.isSelect === true)[0]?.options}
                    isConnectSocket={isConnectSocket}
                    socket={socket}
                    idSlide={
                      dataPresentation?.slides?.filter((item: PropsSlide) => item.isSelect === true)[0]?.id || ''
                    }
                    idPresentation={id || ''}
                  />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                    }}
                    onClick={handle.exit}
                  >
                    <HighlightOffIcon fontSize="large" />
                  </IconButton>
                </Box>
              </Box>
            </FullScreen>
          </Box>
        )}
      </Container>
    </Layout>
  )
}

export default DetailPresetation
