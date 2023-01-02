import React from 'react'
import { Box, CircularProgress, Divider, List, ListItem, ListItemText, TextField } from '@mui/material'

import { PropsMessage } from 'types/presentation'
import InfiniteScroll from 'react-infinite-scroll-component'
import moment from 'moment'

interface Props {
  // eslint-disable-next-line no-unused-vars
  handleChat: (message: string) => void
  listMessage: PropsMessage[]
  handleGetChat: () => void
  isHasMore: boolean
}

const ChatPresent = ({ handleChat, listMessage, handleGetChat, isHasMore }: Props) => {
  const value = true
  const [message, setMessage] = React.useState<string>('')

  const handleEnter = (e: any) => {
    if (e.key === 'Enter') {
      handleChat(message)
      setMessage('')
    }
  }

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
        <InfiniteScroll
          dataLength={listMessage?.length}
          next={() => {
            handleGetChat()
          }}
          style={{ display: 'flex', flexDirection: 'column-reverse', overflow: 'hidden' }}
          inverse={value}
          hasMore={isHasMore}
          loader={
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <CircularProgress size={30} />
            </Box>
          }
          scrollableTarget="scrollableDiv"
        >
          <List>
            {listMessage
              ?.slice()
              ?.reverse()
              ?.map((item) => (
                <Box key={item?.id}>
                  <ListItem>
                    <ListItemText primary={item?.content} secondary={moment(item?.createdAt).fromNow()} />
                  </ListItem>
                  <Divider />
                </Box>
              ))}
          </List>
        </InfiniteScroll>
      </Box>

      <Box
        sx={{
          height: '30px',
        }}
      >
        <TextField
          size="small"
          fullWidth
          value={message}
          onChange={(e) => {
            setMessage(e.target.value)
          }}
          onKeyDown={handleEnter}
        />
      </Box>
    </Box>
  )
}

export default ChatPresent
