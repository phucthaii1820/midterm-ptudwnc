import HttpUtility from './HttpUtility'

const BASE_API = process.env.REACT_APP_BASE_HOST

export const createGroups = ({ name }) => {
  return HttpUtility.post(`${BASE_API}/group/create`, {
    name,
  })
}

export const getAllGroups = () => {
  return HttpUtility.get(`${BASE_API}/group/list-group`)
}

export const getMyGroup = () => {
  return HttpUtility.get(`${BASE_API}/group/list-group?listOption=user_created`)
}

export const getGroupJoined = () => {
  return HttpUtility.get(`${BASE_API}/group/list-group?listOption=user_joined`)
}

export const getGroupDetail = (groupId) => {
  return HttpUtility.get(`${BASE_API}/group/${groupId}/detail`)
}

export const getInviteLinkById = (groupId) => {
  return HttpUtility.get(`${BASE_API}/group/${groupId}/get-invite-link`)
}

export const generateInviteLink = (groupId) => {
  return HttpUtility.get(`${BASE_API}/group/${groupId}/generate-invite-link`)
}

export const joinGroupByLink = (inviteLink) => {
  return HttpUtility.get(`${BASE_API}/group/join-by-link?link=${inviteLink}`)
}

export const changeRole = (groupId, userId, newRole) => {
  return HttpUtility.post(`${BASE_API}/group/${groupId}/assign-role`, {
    userId,
    newRole,
  })
}

export const leaveGroup = (groupId) => {
  return HttpUtility.post(`${BASE_API}/group/${groupId}/leave-group`)
}

export const kickUser = (groupId, userId) => {
  return HttpUtility.post(`${BASE_API}/group/${groupId}/kick-out`, {
    userId,
  })
}

export const sentInviteEmail = (groupId, email) => {
  return HttpUtility.post(`${BASE_API}/group/${groupId}/send-invite-email`, {
    email,
  })
}
