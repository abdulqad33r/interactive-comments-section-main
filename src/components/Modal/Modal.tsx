import { FC, useEffect } from "react"
import {
  SetDeletCommentId,
  SetIsModalOpen,
  SetComments,
} from "../../redux/CommentsSlice"
import { useAppDispatch, useAppSelector } from "../../redux/Store"

const Modal: FC = () => {
  const { mainComments, deleteCommentId, isModalOpen } = useAppSelector(
      (store) => store.postComments
    ),
    dispatch = useAppDispatch()

  const HandleDeleteComment = (id: number | null): void => {
    const updatedComments = mainComments
      .filter((comment) => comment.id !== id)
      .map((comment) => {
        if (comment.replies && comment.replies.length > 0) {
          const updatedReplies = comment.replies.filter(
            (reply) => reply.id !== id
          )
          return { ...comment, replies: updatedReplies }
        } else {
          return comment
        }
      })

    dispatch(SetComments(updatedComments))
    dispatch(SetIsModalOpen(false))
    dispatch(SetDeletCommentId(null))
  }

  useEffect(() => {
    if (isModalOpen) {
      const prevBodyOverflow = window.getComputedStyle(document.body).overflow

      document.body.style.overflow = "hidden"

      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth

      document.body.style.paddingRight = `${scrollbarWidth + 15}px`

      return () => {
        document.body.style.overflow = prevBodyOverflow
        document.body.style.paddingRight = ""
      }
    }
  }, [isModalOpen])

  return (
    <div className="fixed inset-0 z-50 grid w-screen h-screen origin-center bg-black bg-opacity-50 t-1/2 l-1/2 place-items-center">
      <div className="max-w-[350px] rounded-lg bg-white p-6 text-dark-blue">
        <p className="mb-3 text-xl font-bold">Delete comment</p>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>

        <div className="flex items-center justify-around gap-2 mt-4">
          <button
            type="button"
            onClick={() => dispatch(SetIsModalOpen(false))}
            className="px-4 py-2 font-medium text-white rounded-md cursor-pointer bg-dark-blue hover:opacity-50 focus-visible:opacity-50 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-dark-blue [--phone]:px-5 [--phone]:py-2"
          >
            No, CANCEL
          </button>

          <button
            type="button"
            onClick={() => HandleDeleteComment(deleteCommentId)}
            className="px-4 py-2 font-medium text-white rounded-md cursor-pointer bg-soft-red hover:opacity-50 focus-visible:opacity-50 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-soft-red [--phone]:px-5 [--phone]:py-2"
          >
            Yes, DELETE
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
