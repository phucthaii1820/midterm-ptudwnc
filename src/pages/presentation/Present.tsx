/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge, Box, Container, Grid, IconButton, InputAdornment, OutlinedInput, Typography } from '@mui/material'
import { teal } from '@mui/material/colors'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import io from 'socket.io-client'
import { PropsMessage, PrropsSlideSocket } from 'types/presentation'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CloseIcon from '@mui/icons-material/Close'
import ShareIcon from '@mui/icons-material/Share'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ChatIcon from '@mui/icons-material/Chat'
import { Modal, Popover } from 'antd'

import userStore from 'stores/user'
import { TYPE_PARAGRAPH, TYPE_MULTIPLE_CHOICE, TYPE_HEADING } from 'consts/slide'
import Loading from 'components/Loading'
import { toast } from 'react-toastify'
import ChatPresent from 'components/chat/ChatPresent'

const BASE_HOST = process.env.REACT_APP_BASE_HOST_FE
const BASE_API = process.env.REACT_APP_BASE_HOST
const socket = io(BASE_API?.toString() || 'http://localhost:3000', {
  transports: ['websocket'],
  auth: {
    token: userStore.getState().token,
  },
})

const Present = () => {
  const navigate = useNavigate()
  const { idP, idS } = useParams()
  const [data, setData] = React.useState<PrropsSlideSocket>()
  const [nextSlide, setNextSlide] = React.useState<string>('')
  const [prevSlide, setPrevSlide] = React.useState<string>('')
  const [isPending, setIsPending] = React.useState(true)
  const [isModalOpenShare, setIsModalOpenShare] = React.useState(false)
  const [openChat, setOpenChat] = React.useState(false)
  const [listMessage, setListMessage] = React.useState<PropsMessage[]>()
  const [notifiChat, setNotifiChat] = React.useState(0)

  const handleNext = () => {
    if (nextSlide) {
      socket.emit(
        'personal:transfer-slide',
        {
          presentationId: idP,
          slideId: nextSlide,
        },
        (options: any) => {
          for (let i = 0; i < options.length; i += 1) {
            if (options[i].isSelected) {
              setData({
                ...options[i],
                content: options[i]?.type !== TYPE_MULTIPLE_CHOICE ? options[i]?.options : '',
                options: options[i]?.type === TYPE_MULTIPLE_CHOICE ? options[i]?.options : [],
              })
              setNextSlide(options[i + 1]?.id)
              setPrevSlide(options[i - 1]?.id)
              break
            }
          }
        },
      )
    }
  }

  const handlePrev = () => {
    if (prevSlide) {
      socket.emit(
        'personal:transfer-slide',
        {
          presentationId: idP,
          slideId: prevSlide,
        },
        (options: any) => {
          for (let i = 0; i < options.length; i += 1) {
            if (options[i].isSelected) {
              setData({
                ...options[i],
                content: options[i]?.type !== TYPE_MULTIPLE_CHOICE ? options[i]?.options : '',
                options: options[i]?.type === TYPE_MULTIPLE_CHOICE ? options[i]?.options : [],
              })
              setNextSlide(options[i + 1]?.id)
              setPrevSlide(options[i - 1]?.id)
              break
            }
          }
        },
      )
    }
  }

  const handleChat = (message: string) => {
    socket.emit(
      'personal:chat',
      {
        presentationId: idP,
        message,
      },
      (dataChat: PropsMessage[]) => {
        if (dataChat?.length > 0) setListMessage(dataChat)
      },
    )
  }

  React.useEffect(() => {
    socket.emit(
      'personal:start-present',
      {
        presentationId: idP,
        slideId: idS,
      },
      (options: any) => {
        for (let i = 0; i < options.length; i += 1) {
          if (options[i].isSelected) {
            setData({
              ...options[i],
              content: options[i]?.type !== TYPE_MULTIPLE_CHOICE ? options[i]?.options : '',
              options: options[i]?.type === TYPE_MULTIPLE_CHOICE ? options[i]?.options : [],
            })
            setNextSlide(options[i + 1]?.id)
            setPrevSlide(options[i - 1]?.id)
            setIsPending(false)
            break
          }
        }
      },
    )

    socket.emit(
      'personal:get-chat',
      {
        presentationId: idP,
      },
      (dataChat: PropsMessage[]) => {
        if (dataChat?.length > 0) setListMessage(dataChat)
      },
    )

    socket.on('personal:choose-option', (options: any) => {
      for (let i = 0; i < options.length; i += 1) {
        if (options[i].isSelected) {
          setData({
            ...options[i],
            content: options[i]?.type !== TYPE_MULTIPLE_CHOICE ? options[i]?.options : '',
            options: options[i]?.type === TYPE_MULTIPLE_CHOICE ? options[i]?.options : [],
          })
          break
        }
      }
    })

    socket.on('personal:chat', (dataChat: PropsMessage[]) => {
      if (dataChat?.length > 0) {
        setListMessage(dataChat)
        setNotifiChat((prevState) => prevState + 1)
      }
    })

    return () => {
      socket.emit(
        'personal:end-present',
        {
          presentationId: idP,
          slideId: data?.id,
        },
        (err: any) => {
          console.log(err)
        },
      )
    }
  }, [])

  React.useEffect(() => {
    setNotifiChat(0)
  }, [openChat])

  return (
    <Container maxWidth="xl" sx={{ height: '100vh' }}>
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
        <Box
          sx={{
            padding: '50px',
          }}
        >
          <Box
            sx={{
              height: '100%',
              width: '100%',
              backgroundColor: 'white',
              padding: 2,
              position: 'relative',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <IconButton onClick={() => setIsModalOpenShare(true)}>
                <ShareIcon
                  sx={{
                    fontSize: 30,
                  }}
                />
              </IconButton>
              <IconButton
                onClick={() => {
                  navigate(`/presentation/detail/${idP}`)
                }}
              >
                <CloseIcon
                  sx={{
                    fontSize: 40,
                  }}
                />
              </IconButton>
            </Box>

            <Grid
              container
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
              spacing={2}
            >
              <Grid item xs={1}>
                <IconButton onClick={handlePrev} disabled={prevSlide === undefined}>
                  <ChevronLeftIcon
                    sx={{
                      fontSize: 60,
                    }}
                  />
                </IconButton>
              </Grid>
              <Grid
                item
                xs={10}
                sx={{
                  height: '550px',
                  width: '100%',
                  backgroundColor: 'white',
                  padding: 2,
                  position: 'relative',
                }}
              >
                {data?.type === TYPE_MULTIPLE_CHOICE && (
                  <Box>
                    <Typography
                      mb={2}
                      variant="h5"
                      sx={{
                        textAlign: 'center',
                        fontWeight: 700,
                      }}
                    >
                      {data?.title}
                    </Typography>
                    <ResponsiveContainer width="100%" aspect={5.0 / 3.0} height="100%">
                      <BarChart data={data?.options}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="content" />
                        <YAxis />
                        <Tooltip />
                        {/* <Legend /> */}
                        <Bar dataKey="chooseNumber" fill={teal[500]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                )}

                {data?.type === TYPE_HEADING && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 'calc(50% - 100px)',
                      width: '100%',
                      left: 0,
                    }}
                  >
                    <Typography
                      mb={2}
                      variant="h4"
                      sx={{
                        textAlign: 'center',
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {data?.title}
                    </Typography>
                    <Typography
                      mb={2}
                      variant="h6"
                      sx={{
                        textAlign: 'center',
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {data?.content}
                    </Typography>
                  </Box>
                )}

                {data?.type === TYPE_PARAGRAPH && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 'calc(50% - 100px)',
                      width: '100%',
                      left: 0,
                    }}
                  >
                    <Typography
                      mb={2}
                      variant="h4"
                      sx={{
                        textAlign: 'center',
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {data?.title}
                    </Typography>
                    <Typography
                      mb={2}
                      sx={{
                        textAlign: 'center',
                      }}
                    >
                      {data?.content}
                    </Typography>
                  </Box>
                )}
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={handleNext} disabled={nextSlide === undefined}>
                  <ChevronRightIcon
                    sx={{
                      fontSize: 60,
                    }}
                  />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
      {!isPending && (
        <Popover
          content={
            <div>
              <ChatPresent handleChat={handleChat} listMessage={listMessage || []} />
            </div>
          }
          title="Chat"
          trigger="click"
          open={openChat}
          onOpenChange={() => {
            setOpenChat(!openChat)
          }}
        >
          <IconButton
            sx={{
              position: 'fixed',
              bottom: 20,
              right: 140,
            }}
          >
            <Badge badgeContent={!openChat ? notifiChat : 0} color="primary">
              <ChatIcon
                sx={{
                  fontSize: 30,
                }}
              />
            </Badge>
          </IconButton>
        </Popover>
      )}

      <Modal title="Chia sẻ" open={isModalOpenShare} onCancel={() => setIsModalOpenShare(false)} footer={null}>
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <OutlinedInput
            fullWidth
            size="small"
            value={`${BASE_HOST}/presentations/vote/${idP}/${data?.id}`}
            disabled
            sx={{
              mt: 1,
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    navigator.clipboard.writeText(`${BASE_HOST}/presentations/vote/${idP}/${data?.id}`)
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
    </Container>
  )
}

export default Present
