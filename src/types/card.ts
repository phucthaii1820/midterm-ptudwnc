/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropsOption } from './presentation'

/* eslint-disable no-unused-vars */
export interface CardSlideProps {
  id: string
  isSelect: boolean
  nameSlide: string
  index: number
  hanldeClick: (id: string) => void
}

export interface PropCardContentSlide {
  title: string | undefined
  options: [PropsOption] | undefined
  isConnectSocket: boolean
  socket: any
  idPresentation: string
  idSlide: string
}

export interface PropCardSettingSlide {
  title: string | undefined
  options: [PropsOption] | []
  dataPresentation: any
  idSlide: string
  setDataPresentation: (data: any) => void
  fetchData: () => void
}
