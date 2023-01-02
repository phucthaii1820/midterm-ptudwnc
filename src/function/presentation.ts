import { PropsQuestion } from 'types/presentation'

export const sortByTime = (a: PropsQuestion, b: PropsQuestion) => {
  return b.createdAt.localeCompare(a.createdAt)
}

export const sortByVotes = (a: PropsQuestion, b: PropsQuestion) => b.voteQuantity - a.voteQuantity
