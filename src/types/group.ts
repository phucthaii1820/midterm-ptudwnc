export interface Group {
  groupId: string
  groupName: string
  ownerName: string
}

export interface Detailgroup {
  information: {
    id: string
    name: string
    memberNumber: number
    currentUserRole: string
  }
  owner: {
    id: string
    fullName: string
    email: string
    role: string
  }
  members: [
    {
      id: string
      fullName: string
      email: string
      role: string
    },
  ]
}

export interface GroupMember {
  id: string
  fullName: string
  email: string
  role: string
  myRole: string
  groupId: string
  fetchData: () => void
}
