import HttpUtility from './HttpUtility'

const BASE_API = process.env.REACT_APP_BASE_HOST

export const login = ({ email, password }) => {
  return HttpUtility.post(`${BASE_API}/auth/sign-in`, {
    email,
    password,
  })
}

export const register = ({ email, password, fullName }) => {
  return HttpUtility.post(`${BASE_API}/auth/register`, {
    email,
    password,
    fullName,
  })
}

export const activeAccount = ({ code, email }) => {
  return HttpUtility.post(`${BASE_API}/auth/active-account`, {
    code,
    email,
  })
}

export const resendCode = ({ email }) => {
  return HttpUtility.post(`${BASE_API}/auth/send-code`, {
    email,
  })
}

export const loginByGoogle = ({ email, fullName }) => {
  return HttpUtility.post(`${BASE_API}/auth/verify-google`, {
    email,
    fullName,
  })
}
