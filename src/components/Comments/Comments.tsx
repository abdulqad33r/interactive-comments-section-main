import { FC, useState, useEffect, useCallback } from "react"
import {
  ArrowDown,
  Comment,
  CommentReply,
  Modal,
  SingleComment,
} from "../Container"
import { useAppSelector } from "../../redux/Store"

const Comments: FC = () => {
  const { comments, isModalOpen } = useAppSelector(
    (store) => store.postComments
  )

  const [openReplySection, setOpenReplySection] = useState<number | null>(null),
    [reachedBottom, setReachedBottom] = useState(false)

  const ToggleReplyOpen = useCallback(
    (id: number | null) =>
      setOpenReplySection((prevId) => (prevId === id ? null : id)),
    []
  )

  const ScrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior,
      })
    })
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const distanceToBottom =
        document.documentElement.scrollHeight -
        (window.innerHeight + window.scrollY)
      if (distanceToBottom - 50 < 0) setReachedBottom(true)
      else setReachedBottom(false)
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <>
      {isModalOpen && <Modal />}
      <div className="max-w-3xl px-3 pb-45 m-auto mt-6 comments">
        {comments.map((comment: Comment) => (
          <SingleComment
            key={comment.id}
            id={comment.id}
            mainCommentId={comment.id}
            comment={comment}
            openReplySection={openReplySection}
            setOpenReplySection={setOpenReplySection}
            ToggleReplyOpen={ToggleReplyOpen}
          />
        ))}

        <div className="fixed bottom-0 z-40 w-full max-w-[inherit] bg-light-grey pt-0 shadow-[0_0px_10px_rgba(84,87,182,0.432)]">
          <CommentReply
            mainReplySection={true}
            ScrollToBottom={ScrollToBottom}
          />
        </div>

        <button
          onClick={() => ScrollToBottom()}
          className={`hidden floating-btn ${
            reachedBottom ? "reached-bottom" : "not-reached-bottom"
          }`}
        >
          <ArrowDown />
        </button>
      </div>
    </>
  )
}

export default Comments
