import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Data from "../assets/data.json"
import { Comment, InitialState } from "../components/Container.tsx"

export const GetCommentPostedTime = (createdAt: string) => {
  const now: Date = new Date(),
    postedTime: Date = new Date(createdAt),
    timeDifference: number = now.getTime() - postedTime.getTime(),
    seconds: number = Math.floor(timeDifference / 1000)

  if (seconds < 60)
    return seconds === 0
      ? `1 second ago`
      : seconds === 1
      ? `${seconds} second ago`
      : `${seconds} seconds ago`

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60)
    return minutes === 1 ? `${minutes} minute ago` : `${minutes} minutes ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24)
    return hours === 1 ? `${hours} hour ago` : `${hours} hours ago`

  const days = Math.floor(hours / 24)
  if (days < 30) return days === 1 ? `${days} day ago` : `${days} days ago`

  const months = Math.floor(days / 30)
  if (months < 12)
    return months === 1 ? `${months} month ago` : `${months} months ago`

  const years = Math.floor(months / 12)
  return years === 1 ? `${years} year ago` : `${years} years ago`
}

const updatedComments = (COMMENTS: Comment[]) => {
  return COMMENTS.sort((a, b) => b.score - a.score).map((comment) => {
    const updatedReplies: Comment[] =
      comment.replies?.map((reply) => {
        return { ...reply, createdAt: reply.createdAt }
      }) || []

    return {
      ...comment,
      createdAt: comment.createdAt,
      replies: updatedReplies,
    }
  })
}

const initialState: InitialState = {
  users: Data,
  currentUser: { image: { png: "", webp: "" }, username: "" },
  mainComments: Data.comments,
  comments: updatedComments(Data.comments),
  isModalOpen: false,
  deleteCommentId: null,
}

const commentsSlice = createSlice({
  name: "postComments",
  initialState,
  reducers: {
    GetCurrentUser: (state) => {
      state.currentUser = state.users.currentUser
    },
    SetComments: (state, action: PayloadAction<Comment[]>) => {
      state.mainComments = action.payload
      state.comments = updatedComments(state.mainComments)
    },
    SetIsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload
    },
    SetDeletCommentId: (state, action: PayloadAction<number | null>) => {
      state.deleteCommentId = action.payload
    },
  },
})

export const {
  GetCurrentUser,
  SetComments,
  SetIsModalOpen,
  SetDeletCommentId,
} = commentsSlice.actions

export default commentsSlice.reducer
