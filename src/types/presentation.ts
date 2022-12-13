/* eslint-disable no-unused-vars */
export interface PropsPresentationResponse {
  presentationName: string
  presentationId: string
  ownerName: string
  ownerId: string
}

export interface PropsPresentation {
  key: number
  namePresentation: string
  userCreate: string
  createdAt: string
  updatedAt: string
  ownerId: string
  presentationId: string
  isDelete: boolean
  handleDeletePresentation: () => void
  handleUpdatePresentation: (name: string) => void
  fetchData: () => void
}

export interface PropsOption {
  index: number
  content: string
  chooseNumber: number
}

export interface PropsSlide {
  id: string
  title: string
  isSelect: boolean
  options: [PropsOption]
}

export interface PropsPresentDetail {
  presentationId: string
  presentationName: string
  presentationOwnerName: string
  slides: [PropsSlide]
}

export interface PrropsSlideSocket {
  options: [PropsOption]
  title: string
}
