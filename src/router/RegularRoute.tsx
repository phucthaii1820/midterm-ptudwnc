import React from 'react'
import { Box } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import ListMenber from '../pages/ListMenber'
import Infomation from '../pages/profile/Infomation'
import ChangePassword from '../pages/profile/ChangePassword'
import CreateGroup from '../pages/group/CreateGroup'

const RegularRoute = () => {
  return (
    <Box>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/group/:id" element={<ListMenber />} />
        <Route path="/user/my-profile" element={<Infomation />} />
        <Route path="/user/change-password" element={<ChangePassword />} />

        <Route path="/group/create-group" element={<CreateGroup />} />
      </Routes>
    </Box>
  )
}

export default RegularRoute
