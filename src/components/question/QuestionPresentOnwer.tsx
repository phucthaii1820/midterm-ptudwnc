import React from 'react'
import { Box, Divider, Grid, List, ListItem, ListItemText, Typography } from '@mui/material'
import { grey, teal } from '@mui/material/colors'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'

import { PropsQuestion } from 'types/presentation'
import moment from 'moment'

interface Props {
  answeredQuestionList: PropsQuestion[]
  unAnsweredQuestionList: PropsQuestion[]
  // eslint-disable-next-line no-unused-vars
  handleMarkQuestion: (id: string) => void
}

const QuestionPresent = ({ answeredQuestionList, unAnsweredQuestionList, handleMarkQuestion }: Props) => {
  const [valueTab, setValueTab] = React.useState<number>(1)
  return (
    <Box
      sx={{
        height: '400px',
        width: '300px',
      }}
    >
      <Box
        id="scrollableDiv"
        sx={{
          height: '350px',
          overflowY: 'scroll',
          display: 'flex',
          flexDirection: 'column-reverse',
          p: 2,
          pb: 0,
          mt: 1,
        }}
      >
        {valueTab === 1 && (
          <List>
            {unAnsweredQuestionList
              ?.slice()
              ?.reverse()
              ?.map((item) => (
                <Box key={item.id}>
                  <ListItem>
                    <Grid container spacing={1}>
                      <Grid item xs={11}>
                        <ListItemText primary={item?.content} secondary={moment(item?.createdAt).fromNow()} />

                        <Typography
                          sx={{
                            fontSize: '12px',
                            mt: 1,
                            cursor: 'pointer',
                            color: teal[500],
                          }}
                          onClick={() => handleMarkQuestion(item.id)}
                        >
                          Đánh dấu đã trả lời
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={1}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Typography>{item.voteQuantity}</Typography>
                        <ThumbUpOffAltIcon />
                      </Grid>
                    </Grid>
                  </ListItem>
                  <Divider />
                </Box>
              ))}
          </List>
        )}

        {valueTab === 2 && (
          <List>
            {answeredQuestionList
              ?.slice()
              ?.reverse()
              ?.map((item) => (
                <Box key={item.id}>
                  <ListItem>
                    <Grid container spacing={1}>
                      <Grid item xs={11}>
                        <ListItemText primary={item?.content} secondary={moment(item?.createdAt).fromNow()} />
                      </Grid>
                      <Grid
                        item
                        xs={1}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Typography>{item.voteQuantity}</Typography>
                        <ThumbUpOffAltIcon />
                      </Grid>
                    </Grid>
                  </ListItem>
                  <Divider />
                </Box>
              ))}
          </List>
        )}
      </Box>
      <Grid
        sx={{
          height: '30px',
        }}
        container
      >
        <Grid
          item
          xs={6}
          sx={{
            borderRadius: '20px',
            backgroundColor: valueTab === 1 ? grey[200] : 'transparent',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => setValueTab(1)}
        >
          <Typography fontWeight={valueTab === 1 ? 700 : 500} fontSize={14}>
            Chưa trả lời
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            borderRadius: '20px',
            backgroundColor: valueTab === 2 ? grey[200] : 'transparent',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => setValueTab(2)}
        >
          <Typography fontWeight={valueTab === 2 ? 700 : 500} fontSize={14}>
            Đã trả lời
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default QuestionPresent
