import HttpUtility from './HttpUtility'

const BASE_API = process.env.REACT_APP_BASE_HOST

export const changeInfo = ({ fullName }) => {
  return HttpUtility.post(`${BASE_API}/user/update-information`, {
    fullName,
  })
}

export const changePassword = ({ oldPassword, newPassword }) => {
  return HttpUtility.post(`${BASE_API}/user/change-password`, {
    oldPassword,
    newPassword,
  })
}

export const getUserInfo = () => {
  return HttpUtility.get(`${BASE_API}/user/profile`)
}
