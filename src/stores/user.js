import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

let store = (set, get) => ({
  user: {
    fullName: '',
    email: '',
  },
  token: null,
  getUser: () => get().user,
  setDataUser: (data) => {
    set((state) => ({
      ...state,
      user: data,
      token: data.accessToken,
    }))
  },
  logout: async () => {
    set((state) => ({
      ...state,
      user: null,
      token: null,
    }))
  },
})

store = devtools(store) // Allow redux devtool debug
store = persist(store, { name: 'user' }) // Persist to local storage

export default create(store)
