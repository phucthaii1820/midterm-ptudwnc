import React from 'react'
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material'
import { grey, teal } from '@mui/material/colors'
import AddIcon from '@mui/icons-material/Add'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'
import CloseIcon from '@mui/icons-material/Close'

import { PropCardSettingSlide } from 'types/card'
import { updateSlide } from 'api/presentation'
import { PropsOption, PropsPresentDetail, PropsSlide } from 'types/presentation'
import { TYPE_HEADING, TYPE_MULTIPLE_CHOICE, TYPE_PARAGRAPH, TYPE_SLIDE } from 'consts/slide'

const CardSettingSlide = ({
  title,
  options,
  dataPresentation,
  setDataPresentation,
  idSlide,
  fetchData,
  content,
  type,
}: PropCardSettingSlide) => {
  const handleUpdate = async () => {
    if (title === '') {
      toast.error(`${type === TYPE_MULTIPLE_CHOICE ? 'Câu hỏi' : 'Tiêu đề'} không được bỏ trống`)
      return
    }

    if (options.length === 0 && type === TYPE_MULTIPLE_CHOICE) {
      toast.error('Phải có ít nhất một câu trả lời')
      return
    }

    const dataOptions = options?.map((item) => {
      return item?.content
    })

    for (let i = 0; i < dataOptions.length; i += 1) {
      if (dataOptions[i] === '' && type === TYPE_MULTIPLE_CHOICE) {
        toast.error('Câu trả lời không được bỏ trống')
        return
      }
    }

    if (content === '' && type !== TYPE_MULTIPLE_CHOICE) {
      toast.error(`${type === TYPE_HEADING ? 'Tiêu đề phụ' : 'Nội dung'} không được bỏ trống`)
      return
    }

    if (type === TYPE_MULTIPLE_CHOICE) {
      const res = await updateSlide(dataPresentation.presentationId, idSlide, title, dataOptions, type)
      if (res?.data?.status === 200) {
        toast.success('Cập nhật thành công')
        fetchData()
      } else {
        toast.error('Cập nhật thất bại')
      }
    } else {
      const res = await updateSlide(dataPresentation.presentationId, idSlide, title, content, type)
      if (res?.data?.status === 200) {
        toast.success('Cập nhật thành công')
        fetchData()
      } else {
        toast.error('Cập nhật thất bại')
      }
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
      <Typography fontWeight={700}>Loại</Typography>
      <Select
        size="small"
        fullWidth
        value={type}
        onChange={(event: SelectChangeEvent) => {
          setDataPresentation((preState: PropsPresentDetail) => {
            const data = preState?.slides
            const newData = data?.map((item: PropsSlide) => {
              if (item.isSelect) {
                return {
                  ...item,
                  type: event.target.value,
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
      >
        {TYPE_SLIDE.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      <Typography fontWeight={700} mt={3}>
        {type === TYPE_MULTIPLE_CHOICE && 'Câu hỏi'}
        {type !== TYPE_MULTIPLE_CHOICE && 'Tiêu đề'}
      </Typography>
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
        placeholder={type === TYPE_MULTIPLE_CHOICE ? 'Câu hỏi' : 'Tiêu đề'}
        sx={{
          mt: 1,
        }}
        inputProps={{ maxLength: 40 }}
      />
      <Typography fontWeight={700} mt={3}>
        {type === TYPE_MULTIPLE_CHOICE && 'Đáp án'}
        {type === TYPE_HEADING && 'Tiêu đề phụ'}
        {type === TYPE_PARAGRAPH && 'Nội dung'}
      </Typography>

      {type === TYPE_MULTIPLE_CHOICE &&
        options !== undefined &&
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

      {type === TYPE_HEADING && (
        <TextField
          value={content}
          onChange={(e) => {
            setDataPresentation((preState: PropsPresentDetail) => {
              const data = preState?.slides
              const newData = data?.map((item: PropsSlide) => {
                if (item.isSelect) {
                  return {
                    ...item,
                    content: e.target.value,
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
          placeholder="Tiêu đề phụ"
          sx={{
            mt: 1,
          }}
          inputProps={{ maxLength: 70 }}
        />
      )}

      {type === TYPE_PARAGRAPH && (
        <TextField
          multiline
          rows={4}
          value={content}
          onChange={(e) => {
            setDataPresentation((preState: PropsPresentDetail) => {
              const data = preState?.slides
              const newData = data?.map((item: PropsSlide) => {
                if (item.isSelect) {
                  return {
                    ...item,
                    content: e.target.value,
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
          placeholder="Nội dung"
          sx={{
            mt: 1,
          }}
          inputProps={{ maxLength: 700 }}
        />
      )}
      {type === TYPE_MULTIPLE_CHOICE && (
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
      )}
    </Box>
  )
}

export default CardSettingSlide
