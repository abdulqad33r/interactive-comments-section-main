export interface DataInterface {
  currentUser: User
  comments: Comment[]
}

export interface Comment {
  id: number
  content: string
  createdAt: string
  score: number
  user: User
  replies?: Comment[]
  replyingTo?: string
}

export interface User {
  image: Image
  username: string
}

export interface Image {
  png: string
  webp: string
}

export interface InitialState {
  users: DataInterface
  currentUser: User
  mainComments: Comment[]
  comments: Comment[]
  isModalOpen: boolean
  deleteCommentId: number | null
}

export interface SingleCommentProps {
  id: number
  mainCommentId: number
  comment: Comment
  openReplySection: number | null
  setOpenReplySection: React.Dispatch<React.SetStateAction<number | null>>
  ToggleReplyOpen: (id: number | null) => void
}

export interface CommentReplyProps {
  id?: number
  mainCommentId?: number
  openReplySection?: number | null
  isEditing?: boolean
  ToggleReplyOpen?: (id: number | null) => void
  mainReplySection?: boolean
  ScrollToBottom?: (behavior: ScrollBehavior) => void
}
