export const validatePass = function validatePassword(pass) {
  const newPasswordTemp = pass
  const minNumberofChars = 6
  const maxNumberofChars = 16
  const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/

  if (newPasswordTemp.length < minNumberofChars || newPasswordTemp.length > maxNumberofChars) {
    return false
  }
  if (!regularExpression.test(newPasswordTemp)) {
    return false
  }
  return true
}
