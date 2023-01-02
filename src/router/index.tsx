import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Present from 'pages/presentation/Present'
import Login from 'pages/auth/Login'
import Register from 'pages/auth/Register'
import userStore from 'stores/user'
import Vote from 'pages/presentation/View'
import ResetPassword from 'pages/auth/ResetPassword'

import RegularRoute from './RegularRoute'

export default function WebRoute() {
  const { token } = userStore()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={token ? <Navigate to="/" /> : <Login />} />
        <Route path="register" element={token ? <Navigate to="/" /> : <Register />} />
        <Route path="/*" element={token ? <RegularRoute /> : <Navigate to="/login" />} />

        <Route path="/presentations/view/:idP/:idS" element={<Vote />} />
        <Route path="/presentations/present/:idP/:idS" element={<Present />} />
        <Route path="/reset-password/:code" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  )
}
