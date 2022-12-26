import React from 'react'
import { Box } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import AllGroup from 'pages/group/AllGroup'
import ListMenber from 'pages/ListMenber'
import Infomation from 'pages/profile/Infomation'
import ChangePassword from 'pages/profile/ChangePassword'
import CreateGroup from 'pages/group/CreateGroup'
import MyGroup from 'pages/group/MyGroup'
import GroupJoined from 'pages/group/GroupJoined'
import JoinGroupByLink from 'pages/group/JoinGroupByLink'
import ListPresentation from 'pages/presentation/ListPresentation'
import DetailPresetation from 'pages/presentation/DetailPresetation'

const RegularRoute = () => {
  return (
    <Box>
      <Routes>
        <Route path="" element={<AllGroup />} />
        <Route path="/all-group" element={<AllGroup />} />
        <Route path="/my-group" element={<MyGroup />} />
        <Route path="/group-joined" element={<GroupJoined />} />

        <Route path="/group/:id" element={<ListMenber />} />
        <Route path="/user/my-profile" element={<Infomation />} />
        <Route path="/user/change-password" element={<ChangePassword />} />

        <Route path="/group/create-group" element={<CreateGroup />} />
        <Route path="/join-group-by-link/:id" element={<JoinGroupByLink />} />

        <Route path="/presentation" element={<ListPresentation />} />
        <Route path="/presentation/detail/:id" element={<DetailPresetation />} />
      </Routes>
    </Box>
  )
}

export default RegularRoute
