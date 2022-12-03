import React from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { grey, teal } from '@mui/material/colors'
import AddIcon from '@mui/icons-material/Add'

const CardSettingSlide = () => {
  return (
    <Box
      sx={{
        // width: '100%',
        background: 'white',
        padding: '1rem 0 1rem 1rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          Tùy chỉnh Slide
        </Typography>
        <Button
          sx={{
            px: 2,
            background: teal[500],
            color: 'white',
            '&:hover': {
              background: teal[300],
            },
            '&:disabled': {
              background: grey[500],
              color: 'white',
            },
          }}
          disabled
        >
          Lưu
        </Button>
      </Box>
      <Typography fontWeight={700}>Câu hỏi</Typography>
      <TextField
        size="small"
        fullWidth
        placeholder="Câu hỏi"
        sx={{
          mt: 1,
        }}
      />
      <Typography fontWeight={700} mt={3}>
        Đáp án
      </Typography>
      <TextField
        size="small"
        fullWidth
        placeholder="Đáp án 1"
        sx={{
          mt: 1,
        }}
      />
      <TextField
        size="small"
        fullWidth
        placeholder="Đáp án 2"
        sx={{
          mt: 1,
        }}
      />

      <Button
        fullWidth
        sx={{
          mt: 1,
          px: 2,
          background: grey[500],
          color: 'white',
          '&:hover': {
            background: grey[400],
          },
        }}
        startIcon={<AddIcon />}
      >
        Thêm đáp án
      </Button>
    </Box>
  )
}

export default CardSettingSlide
