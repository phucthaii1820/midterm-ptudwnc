import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import RegularRoute from './RegularRoute'
import userStore from '../stores/user'
import Vote from '../pages/presentation/Vote'

export default function WebRoute() {
  const { token } = userStore()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={token ? <Navigate to="/" /> : <Login />} />
        <Route path="register" element={token ? <Navigate to="/" /> : <Register />} />
        <Route path="/*" element={token ? <RegularRoute /> : <Navigate to="/login" />} />

        <Route path="/presentations/vote/:idP/:idS" element={<Vote />} />
      </Routes>
    </BrowserRouter>
  )
}
