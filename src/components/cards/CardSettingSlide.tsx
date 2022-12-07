import React from 'react'
import { Box, Button, IconButton, InputAdornment, OutlinedInput, TextField, Typography } from '@mui/material'
import { grey, teal } from '@mui/material/colors'
import AddIcon from '@mui/icons-material/Add'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'
import CloseIcon from '@mui/icons-material/Close'

import { PropCardSettingSlide } from '../../types/card'
import { updateSlide } from '../../api/presentation'
import { PropsOption, PropsPresentDetail, PropsSlide } from '../../types/presentation'

const CardSettingSlide = ({
  title,
  options,
  dataPresentation,
  setDataPresentation,
  idSlide,
  fetchData,
}: PropCardSettingSlide) => {
  const handleUpdate = async () => {
    if (title === '') {
      toast.error('Câu hỏi không được bỏ trống')
      return
    }

    if (options.length === 0) {
      toast.error('Phải có ít nhất một câu trả lời')
      return
    }

    const dataOptions = options?.map((item) => {
      return item?.content
    })

    for (let i = 0; i < dataOptions.length; i += 1) {
      if (dataOptions[i] === '') {
        toast.error('Câu trả lời không được bỏ trống')
        return
      }
    }

    const res = await updateSlide(dataPresentation.presentationId, idSlide, title, dataOptions)
    if (res?.data?.status === 200) {
      toast.success('Cập nhật thành công')
      fetchData()
    } else {
      toast.error('Cập nhật thất bại')
    }
  }

  const createOption = () => {
    setDataPresentation((preState: PropsPresentDetail) => {
      const data = preState?.slides
      const newData = data?.map((item: PropsSlide) => {
        if (item.isSelect) {
          return {
            ...item,
            options: [
              ...item.options,
              {
                index: uuidv4(),
                content: '',
                chooseNumber: 0,
              },
            ],
          }
        }
        return item
      })
      return {
        ...preState,
        slides: newData,
      }
    })
  }

  return (
    <Box
      sx={{
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
          onClick={handleUpdate}
        >
          Lưu
        </Button>
      </Box>
      <Typography fontWeight={700}>Câu hỏi</Typography>
      <TextField
        value={title}
        onChange={(e) => {
          setDataPresentation((preState: PropsPresentDetail) => {
            const data = preState?.slides
            const newData = data?.map((item: PropsSlide) => {
              if (item.isSelect) {
                return {
                  ...item,
                  title: e.target.value,
                }
              }
              return {
                ...item,
              }
            })
            return {
              ...preState,
              slides: newData,
            }
          })
        }}
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

      {options !== undefined &&
        options?.length > 0 &&
        options?.map((item: PropsOption, index: number) => (
          <OutlinedInput
            key={item.index}
            value={item.content}
            size="small"
            fullWidth
            placeholder={`Đáp án ${index + 1}`}
            sx={{
              mt: 1,
            }}
            onChange={(e) => {
              setDataPresentation((preState: PropsPresentDetail) => {
                const data = preState?.slides
                const newData = data?.map((itemSlide: PropsSlide) => {
                  if (itemSlide.isSelect) {
                    return {
                      ...itemSlide,
                      options: itemSlide.options?.map((option: PropsOption) => {
                        if (option.index === item.index) {
                          return {
                            ...option,
                            content: e.target.value,
                          }
                        }
                        return option
                      }),
                    }
                  }
                  return {
                    ...itemSlide,
                  }
                })
                return {
                  ...preState,
                  slides: newData,
                }
              })
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setDataPresentation((preState: PropsPresentDetail) => {
                      const data = preState?.slides
                      const newData = data?.map((itemSlide: PropsSlide) => {
                        if (itemSlide.isSelect) {
                          return {
                            ...itemSlide,
                            options: itemSlide.options?.filter((option: PropsOption) => option.index !== item.index),
                          }
                        }
                        return {
                          ...itemSlide,
                        }
                      })
                      return {
                        ...preState,
                        slides: newData,
                      }
                    })
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        ))}

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
        onClick={createOption}
      >
        Thêm đáp án
      </Button>
    </Box>
  )
}

export default CardSettingSlide
