import HttpUtility from './HttpUtility'

const BASE_API = process.env.REACT_APP_BASE_HOST

export const login = ({ username, password }) => {
  return HttpUtility.post(`${BASE_API}/auth/sign-in`, {
    username,
    password,
  })
}
