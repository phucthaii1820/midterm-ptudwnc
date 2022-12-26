/* eslint-disable no-useless-escape */
export const isEmail = (emailValid) => {
  return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(emailValid)
}
