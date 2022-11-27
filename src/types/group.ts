export interface Group {
  groupId: string
  groupName: string
}

export interface Detailgroup {
  information: {
    name: string
    memberNumber: number
  }
  owner: {
    id: string
    fullName: string
    email: string
    role: string
  }
  menber: [
    {
      id: string
      fullName: string
      email: string
      role: string
    },
  ]
}

export interface GroupMember {
  //   id: string
  fullName: string
  email: string
  role: string
}
