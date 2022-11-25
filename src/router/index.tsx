import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import RegularRoute from './RegularRoute'
import userStore from '../stores/user'

export default function WebRoute() {
  const { token } = userStore()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/*" element={token ? <RegularRoute /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}
