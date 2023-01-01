import React from 'react'
import { Box, Divider, List, ListItem, ListItemText, TextField } from '@mui/material'

import { PropsMessage } from 'types/presentation'

interface Props {
  // eslint-disable-next-line no-unused-vars
  handleChat: (message: string) => void
  listMessage: PropsMessage[]
}

const ChatPresent = ({ handleChat, listMessage }: Props) => {
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
        sx={{
          height: '370px',
          overflow: 'auto',
        }}
      >
        <List>
          {listMessage?.map((item) => (
            <Box key={item?.createdAt}>
              <ListItem>
                <ListItemText primary={item?.content} secondary={item?.createdAt} />
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
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
