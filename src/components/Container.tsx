export { default as Comments } from "./Comments/Comments.tsx"
export { default as Modal } from "./Modal/Modal.tsx"
export { default as SingleComment } from "./Comments/SingleComment/SingleComment.tsx"
export { default as CommentReply } from "./Comments/CommentReply/CommentReply.tsx"

import {
  DataInterface,
  Comment,
  User,
  Image,
  InitialState,
  SingleCommentProps,
  CommentReplyProps,
} from "../assets/Interfaces.ts"
export type {
  DataInterface,
  Comment,
  User,
  Image,
  InitialState,
  SingleCommentProps,
  CommentReplyProps,
}

export { useAppDispatch, useAppSelector } from "../redux/Store.ts"

export { FaChevronDown as ArrowDown } from "react-icons/fa"
