/* eslint-disable no-unsafe-optional-chaining */
import React from 'react'
import { Badge, Box, Button, Grid, IconButton, List, Typography } from '@mui/material'
import { grey, teal } from '@mui/material/colors'
import { useParams } from 'react-router-dom'
import io from 'socket.io-client'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import ChatIcon from '@mui/icons-material/Chat'
import QuizIcon from '@mui/icons-material/Quiz'

import { PropsMessage, PropsQuestion, PrropsSlideSocket, QuestionList } from 'types/presentation'
import Loading from 'components/Loading'
import { TYPE_PARAGRAPH, TYPE_MULTIPLE_CHOICE, TYPE_HEADING } from 'consts/slide'
import { Popover, Space } from 'antd'
import ChatPresent from 'components/chat/ChatPresent'
// import QuestionPresent from 'components/question/QuestionPresentOnwer'
import QuestionView from 'components/question/QuestionView'
import { sortByTime, sortByVotes } from 'function/presentation'

const BASE_API = process.env.REACT_APP_BASE_HOST
const socket = io(BASE_API?.toString() || 'http://localhost:3000')

const Vote = () => {
  const { idP, idS } = useParams()
  const [valueSeclect, setValueSeclect] = React.useState<number>(0)
  const [data, setData] = React.useState<PrropsSlideSocket>()
  const [isPending, setIsPending] = React.useState<boolean>(true)
  const [disabledChoose, setDisabledChoose] = React.useState<boolean>(false)
  const [endPresent, setEndPresent] = React.useState<boolean>(false)
  const [listMessage, setListMessage] = React.useState<PropsMessage[]>([])
  const [openChat, setOpenChat] = React.useState(false)
  const [openQuestion, setOpenQuestion] = React.useState(false)
  const [notifiChat, setNotifiChat] = React.useState(0)
  const [newMessage, setNewMessage] = React.useState({
    content: '',
    createdAt: '',
    id: '',
  })
  const [isHasMore, setIsHasMore] = React.useState(true)
  const [listQuestion, setListQuestion] = React.useState<PropsQuestion[]>([])
  const [sort, setSort] = React.useState('1')

  const handleChat = (message: string) => {
    socket.emit(
      'personal:chat',
      {
        presentationId: idP,
        message,

        createdAt: listMessage[listMessage?.length - 1]?.createdAt,
      },
      (dataChat: PropsMessage) => {
        if (dataChat?.content !== '') setListMessage([dataChat, ...listMessage])
      },
    )
  }

  const handleQuestion = (message: string) => {
    socket.emit(
      'personal:post-question',
      {
        presentationId: idP,
        message,
      },
      (dataChat: QuestionList) => {
        if (sort === '1') setListQuestion(dataChat?.unAnsweredQuestionList.sort(sortByTime))
        else setListQuestion(dataChat?.unAnsweredQuestionList.sort(sortByVotes))
      },
    )
  }

  const handleVoteQuestion = (questionId: string) => {
    socket.emit(
      'personal:vote-question',
      {
        presentationId: idP,
        questionId,
      },
      (dataChat: QuestionList) => {
        if (sort === '1') setListQuestion(dataChat?.unAnsweredQuestionList.sort(sortByTime))
        else setListQuestion(dataChat?.unAnsweredQuestionList.sort(sortByVotes))
      },
    )
  }

  const handleGetChat = () => {
    socket.emit(
      'personal:get-chat',
      {
        presentationId: idP,

        createdAt: listMessage[listMessage?.length - 1]?.createdAt,
      },
      (dataChat: PropsMessage[]) => {
        if (dataChat?.length > 0) {
          setListMessage(dataChat)
          if (dataChat?.length < 10) setIsHasMore(false)
        } else setIsHasMore(false)
      },
    )
  }

  React.useEffect(() => {
    socket.emit(
      'personal:join-present',
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
            setIsPending(false)
            break
          }
        }
        setIsPending(false)
      },
    )

    socket.emit(
      'personal:get-chat',
      {
        presentationId: idP,
      },
      (dataChat: PropsMessage[]) => {
        if (dataChat?.length > 0) {
          setListMessage(dataChat)
          if (dataChat?.length < 10) setIsHasMore(false)
        } else setIsHasMore(false)
      },
    )

    socket.emit(
      'personal:get-question',
      {
        presentationId: idP,
      },
      (dataChat: QuestionList) => {
        if (sort === '1') setListQuestion(dataChat?.unAnsweredQuestionList.sort(sortByTime))
        else setListQuestion(dataChat?.unAnsweredQuestionList.sort(sortByVotes))
      },
    )

    socket.on('personal:transfer-slide', (options: any) => {
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

    socket.on('personal:chat', (dataChat: PropsMessage) => {
      if (dataChat?.content !== '') {
        setNewMessage(dataChat)
      }
    })

    socket.on('personal:end-present', () => {
      setEndPresent(true)
    })

    socket.on('personal:post-question', (dataChat: QuestionList) => {
      if (sort === '1') setListQuestion(dataChat?.unAnsweredQuestionList.sort(sortByTime))
      else setListQuestion(dataChat?.unAnsweredQuestionList.sort(sortByVotes))
    })

    socket.on('personal:vote-question', (dataChat: QuestionList) => {
      if (sort === '1') setListQuestion(dataChat?.unAnsweredQuestionList.sort(sortByTime))
      else setListQuestion(dataChat?.unAnsweredQuestionList.sort(sortByVotes))
    })

    socket.on('personal:mark-as-read', (dataChat: QuestionList) => {
      if (sort === '1') setListQuestion(dataChat?.unAnsweredQuestionList.sort(sortByTime))
      else setListQuestion(dataChat?.unAnsweredQuestionList.sort(sortByVotes))
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('stat')
    }
  }, [])

  React.useEffect(() => {
    setNotifiChat(0)
  }, [openChat])

  React.useEffect(() => {
    if (newMessage?.content !== '') {
      setListMessage([newMessage, ...listMessage])
      setNotifiChat((prevState) => prevState + 1)
    }
  }, [newMessage])

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
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
          {endPresent ? (
            <Box>
              <Typography textAlign="center" fontWeight={700}>
                Bài trình chiếu đã kết thúc
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                width: '80%',
                height: '700px',
                backgroundColor: 'white',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              {data?.type === TYPE_MULTIPLE_CHOICE && (
                <Grid container>
                  <Grid item xs={8}>
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
                  </Grid>
                  <Grid item xs={4}>
                    <Typography textAlign="center" fontWeight={700}>
                      CHỌN ĐÁP ÁN
                    </Typography>
                    <List>
                      {data?.options?.map((item) => (
                        <Button
                          key={item.index}
                          fullWidth
                          sx={{
                            my: 0.5,
                            border: `1px solid ${grey[500]}`,
                            borderRadius: '5px',
                            color: valueSeclect === item.index ? 'white' : 'black',
                            backgroundColor: valueSeclect === item.index ? grey[500] : 'white',

                            '&:hover': {
                              backgroundColor: grey[500],
                              color: 'white',
                            },
                          }}
                          onClick={() => {
                            setValueSeclect(item.index)
                          }}
                        >
                          {item.content}
                        </Button>
                      ))}

                      <Button
                        fullWidth
                        sx={{
                          my: 2,
                          backgroundColor: teal[500],
                          color: 'white',
                          '&:hover': {
                            backgroundColor: teal[300],
                            color: 'white',
                          },
                          '&:disabled': {
                            backgroundColor: grey[500],
                            color: 'white',
                          },
                        }}
                        disabled={valueSeclect === 0 || disabledChoose}
                        onClick={() => {
                          setDisabledChoose(true)
                          socket.emit(
                            'personal:choose-option',
                            {
                              presentationId: idP,
                              slideId: data?.id,
                              index: valueSeclect,
                            },
                            (options: any) => {
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
                            },
                          )
                        }}
                      >
                        Gửi đáp án
                      </Button>
                    </List>
                  </Grid>
                </Grid>
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
            </Box>
          )}
        </Box>
      )}
      {!isPending && !endPresent && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 20,
            right: '125px',
          }}
        >
          <Space>
            <Popover
              content={
                <div>
                  <ChatPresent
                    handleChat={handleChat}
                    listMessage={listMessage || []}
                    handleGetChat={handleGetChat}
                    isHasMore={isHasMore}
                  />
                </div>
              }
              title="Chat"
              trigger="click"
              open={openChat}
              onOpenChange={() => {
                setOpenChat(!openChat)
              }}
            >
              <IconButton>
                <Badge badgeContent={!openChat ? notifiChat : 0} color="primary">
                  <ChatIcon
                    sx={{
                      fontSize: 30,
                    }}
                  />
                </Badge>
              </IconButton>
            </Popover>
            <IconButton
              onClick={() => {
                setOpenQuestion(!openQuestion)
              }}
            >
              <Badge badgeContent={0} color="primary">
                <QuizIcon
                  sx={{
                    fontSize: 30,
                  }}
                />
              </Badge>
            </IconButton>
            <QuestionView
              openQuestion={openQuestion}
              setOpenQuestion={setOpenQuestion}
              handleQuestion={handleQuestion}
              listQuestion={listQuestion}
              sort={sort}
              setSort={setSort}
              handleVoteQuestion={handleVoteQuestion}
            />
          </Space>
        </Box>
      )}
    </Box>
  )
}

export default Vote
