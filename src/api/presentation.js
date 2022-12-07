import HttpUtility from './HttpUtility'

const BASE_API = process.env.REACT_APP_BASE_HOST

export const createPresentation = ({ name }) => {
  return HttpUtility.post(`${BASE_API}/presentation/create-presentation`, {
    name,
  })
}

export const getPresentation = () => {
  return HttpUtility.get(`${BASE_API}/presentation/list-presentation`)
}

export const deletePresentation = (id) => {
  return HttpUtility.post(`${BASE_API}/presentation/${id}/delete`)
}

export const updatePresentation = (id, name) => {
  return HttpUtility.post(`${BASE_API}/presentation/${id}/edit`, {
    name,
  })
}

export const getSlideOfPresent = (id) => {
  return HttpUtility.get(`${BASE_API}/presentation/${id}/list-slide`)
}

export const createSlide = (id, title, contents) => {
  return HttpUtility.post(`${BASE_API}/presentation/${id}/create-slide`, {
    title,
    contents,
  })
}

export const updateSlide = (idPresent, idSlide, title, contents) => {
  return HttpUtility.post(`${BASE_API}/presentation/${idPresent}/slide/${idSlide}/edit`, {
    title,
    contents,
  })
}

export const deleteSlide = (idPresent, idSlide) => {
  return HttpUtility.post(`${BASE_API}/presentation/${idPresent}/slide/${idSlide}/delete`)
}
