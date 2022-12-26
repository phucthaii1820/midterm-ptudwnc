/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropsOption } from './presentation'

/* eslint-disable no-unused-vars */
export interface CardSlideProps {
  id: string
  isSelect: boolean
  nameSlide: string
  index: number
  hanldeClick: (id: string) => void
  type: string
}

export interface PropCardContentSlide {
  title: string | undefined
  options: [PropsOption] | undefined
  socket: any
  idPresentation: string
  idSlide: string
  type: string
  content: string
}

export interface PropCardSettingSlide {
  title: string | undefined
  options: [PropsOption] | []
  dataPresentation: any
  idSlide: string
  setDataPresentation: (data: any) => void
  fetchData: () => void
  content: string
  type: string
}
