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
  Menu,
  MenuItem,
  OutlinedInput,
  Typography,
} from '@mui/material'
import { grey, red, teal } from '@mui/material/colors'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
// import ShareIcon from '@mui/icons-material/Share'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate, useParams } from 'react-router-dom'
import { Modal, Space } from 'antd'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { toast } from 'react-toastify'
import DeleteIcon from '@mui/icons-material/Delete'
import io from 'socket.io-client'

import Layout from 'components/layouts/Layout'
import CardSlide from 'components/cards/CardSlide'
import CardContentSlide from 'components/cards/CardContentSlide'
import CardSettingSlide from 'components/cards/CardSettingSlide'
import { createSlide, deleteSlide, getSlideOfPresent } from 'api/presentation'
import { PropsPresentDetail, PropsSlide } from 'types/presentation'
import Loading from 'components/Loading'
import { TYPE_MULTIPLE_CHOICE } from 'consts/slide'
import MenuTypePresent from 'components/menu/MenuTypePresent'

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
  const [anchorElCreateSlide, setAnchorElCreateSlide] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorElCreateSlide)
  const handleClickCreateSlide = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElCreateSlide(event.currentTarget)
  }

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
              content: item?.type !== TYPE_MULTIPLE_CHOICE ? item?.options : '',
              options: item?.type === TYPE_MULTIPLE_CHOICE ? item?.options : [],
            }
          }
          return {
            ...item,
            isSelect: false,
            content: item?.type !== TYPE_MULTIPLE_CHOICE ? item?.options : '',
            options: item?.type === TYPE_MULTIPLE_CHOICE ? item?.options : [],
          }
        }),
      })
      setIsPending(false)
    }
  }

  const handleCreateSlide = async (type: any) => {
    if (type === 1) {
      setIsLoadingCreateSlide(true)
      await createSlide(id, '', [''], 'multiple_choice')
      handleGetPresentation()
      setIsLoadingCreateSlide(false)
    } else if (type === 2) {
      setIsLoadingCreateSlide(true)
      await createSlide(id, '', [''], 'paragraph')
      handleGetPresentation()
      setIsLoadingCreateSlide(false)
    } else {
      setIsLoadingCreateSlide(true)
      await createSlide(id, '', [''], 'heading')
      handleGetPresentation()
      setIsLoadingCreateSlide(false)
    }
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
    if (id) {
      handleGetPresentation()
    }
  }, [id])

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
                <IconButton onClick={() => navigate('/presentation')}>
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

              <Box
                sx={{
                  display: 'flex',
                }}
              >
                <MenuTypePresent
                  idS={dataPresentation?.slides?.filter((item: PropsSlide) => item.isSelect === true)[0]?.id || ''}
                  idP={dataPresentation?.presentationId || ''}
                />
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
                <Box>
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
                    disabled={isLoadingCreateSlide}
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClickCreateSlide}
                  >
                    Tạo slide
                  </Button>
                  <Menu
                    anchorEl={anchorElCreateSlide}
                    open={open}
                    onClose={() => {
                      setAnchorElCreateSlide(null)
                    }}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleCreateSlide(1)
                      }}
                    >
                      Multiple choice
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleCreateSlide(2)
                      }}
                    >
                      Paragraph
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleCreateSlide(3)
                      }}
                    >
                      Heading
                    </MenuItem>
                  </Menu>
                </Box>
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
                      type={item.type}
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
                    socket={socket}
                    idSlide={
                      dataPresentation?.slides?.filter((item: PropsSlide) => item.isSelect === true)[0]?.id || ''
                    }
                    idPresentation={id || ''}
                    content={
                      dataPresentation?.slides?.filter((item: PropsSlide) => item.isSelect === true)[0]?.content || ''
                    }
                    type={dataPresentation?.slides?.filter((item: PropsSlide) => item.isSelect === true)[0]?.type || ''}
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
                    content={
                      dataPresentation?.slides?.filter((item: PropsSlide) => item.isSelect === true)[0]?.content || ''
                    }
                    type={dataPresentation?.slides?.filter((item: PropsSlide) => item.isSelect === true)[0]?.type || ''}
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
          </Box>
        )}
      </Container>
    </Layout>
  )
}

export default DetailPresetation
