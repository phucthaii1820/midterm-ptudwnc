/* eslint-disable camelcase */
import React from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { Button } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import { red } from '@mui/material/colors'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import { loginByGoogle } from 'api/auth'
import userStore from 'stores/user'

const LoginG = () => {
  const { setDataUser } = userStore()
  const navigate = useNavigate()

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        })

        const res2 = await toast.promise(loginByGoogle({ email: res?.data?.email, fullName: res?.data?.name }), {
          pending: 'Đang đăng nhập...',
        })

        if (res2?.data?.error?.code === 'account_exist') {
          toast.error('Tài khoản đã được đăng kí')
        } else {
          setDataUser(res2?.data?.data)
          navigate('/')
          toast.success('Đăng nhập thành công')
        }
      } catch (error) {
        toast.error('Đăng nhập bằng Google không thành công')
      }
    },
  })

  return (
    <Button
      startIcon={<GoogleIcon />}
      fullWidth
      sx={{
        py: 2,
        background: red[400],
        color: 'white',
        '&:hover': {
          background: red[300],
        },
      }}
      onClick={() => login()}
    >
      Google
    </Button>
  )
}

export default LoginG
