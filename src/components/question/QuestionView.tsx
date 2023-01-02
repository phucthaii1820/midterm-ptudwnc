/* eslint-disable no-unused-vars */
import React from 'react'
import { Drawer, Space } from 'antd'
import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import { PropsQuestion } from 'types/presentation'
import moment from 'moment'
import { sortByTime, sortByVotes } from 'function/presentation'

interface Props {
  openQuestion: boolean
  setOpenQuestion: React.Dispatch<React.SetStateAction<boolean>>
  handleQuestion: (message: string) => void
  listQuestion: PropsQuestion[]
  sort: string
  setSort: React.Dispatch<React.SetStateAction<string>>
  handleVoteQuestion: (id: string) => void
}

const QuestionView = ({
  openQuestion,
  setOpenQuestion,
  handleQuestion,
  listQuestion,
  sort,
  setSort,
  handleVoteQuestion,
}: Props) => {
  const [question, setQuestion] = React.useState('')
  const [listVote, setListVote] = React.useState<string[]>([])

  const handleEnter = (e: any) => {
    if (e.key === 'Enter') {
      handleQuestion(question)
      setQuestion('')
    }
  }

  return (
    <Box>
      <Drawer
        title="Question"
        placement="bottom"
        open={openQuestion}
        onClose={() => setOpenQuestion(false)}
        height={530}
        style={{
          maxWidth: '70%',
          margin: 'auto',
          borderRadius: '10px 10px 0 0',
        }}
        contentWrapperStyle={{
          boxShadow: 'none',
        }}
        className="drawer"
      >
        <Select
          size="small"
          fullWidth
          value={sort}
          onChange={(event: SelectChangeEvent) => {
            setSort(event.target.value as string)
          }}
        >
          <MenuItem value="1">Thời gian</MenuItem>
          <MenuItem value="2">Top Câu hỏi</MenuItem>
        </Select>
        {sort === '1' && (
          <List
            sx={{
              height: '330px',
              overflowY: 'scroll',
              overflowX: 'hidden',
              mt: 1,
            }}
          >
            {listQuestion?.sort(sortByTime)?.map((item) => (
              <Box key={item.id}>
                <ListItem
                  sx={{
                    my: 1,
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={11}>
                      <ListItemText primary={item?.content} secondary={moment(item?.createdAt).fromNow()} />
                    </Grid>
                    <Grid item xs={1}>
                      <Space>
                        <Typography>{item.voteQuantity}</Typography>
                        {listVote.includes(item.id) ? (
                          <ThumbUpAltIcon />
                        ) : (
                          <ThumbUpOffAltIcon
                            sx={{
                              cursor: 'pointer',
                            }}
                            onClick={() => {
                              setListVote([...listVote, item.id])
                              handleVoteQuestion(item.id)
                            }}
                          />
                        )}
                      </Space>
                    </Grid>
                  </Grid>
                </ListItem>
                <Divider />
              </Box>
            ))}
          </List>
        )}

        {sort === '2' && (
          <List
            sx={{
              height: '330px',
              overflowY: 'scroll',
              overflowX: 'hidden',
              mt: 1,
            }}
          >
            {listQuestion?.sort(sortByVotes)?.map((item) => (
              <Box key={item.id}>
                <ListItem
                  sx={{
                    my: 1,
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={11}>
                      <ListItemText primary={item?.content} secondary={moment(item?.createdAt).fromNow()} />
                    </Grid>
                    <Grid item xs={1}>
                      <Space>
                        <Typography>{item.voteQuantity}</Typography>
                        {listVote.includes(item.id) ? (
                          <ThumbUpAltIcon />
                        ) : (
                          <ThumbUpOffAltIcon
                            sx={{
                              cursor: 'pointer',
                            }}
                            onClick={() => {
                              setListVote([...listVote, item.id])
                              handleVoteQuestion(item.id)
                            }}
                          />
                        )}
                      </Space>
                    </Grid>
                  </Grid>
                </ListItem>
                <Divider />
              </Box>
            ))}
          </List>
        )}

        <Box
          sx={{
            height: '30px',
            m: 0.5,
          }}
        >
          <TextField
            size="small"
            fullWidth
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value)
            }}
            onKeyDown={handleEnter}
          />
        </Box>
      </Drawer>
    </Box>
  )
}

export default QuestionView
