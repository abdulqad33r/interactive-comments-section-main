import { FC, useState, useEffect, useCallback, memo } from "react"
import {
  ArrowDown,
  Comment,
  CommentReply,
  Modal,
  SingleComment,
  useAppSelector,
} from "../Container"

const Comments: FC = () => {
  const { comments, isModalOpen } = useAppSelector(
    (store) => store.postComments
  )

  const [openReplySection, setOpenReplySection] = useState<number | null>(null),
    [reachedBottom, setReachedBottom] = useState<boolean>(false)

  const ToggleReplyOpen = useCallback(
    (id: number | null) =>
      setOpenReplySection((prevId) => (prevId === id ? null : id)),
    []
  )

  const ScrollToBottom = useCallback(
    () =>
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      }),
    []
  )

  useEffect(() => {
    const andleScroll = () => {
      const distanceToBottom =
        document.documentElement.scrollHeight -
        (window.innerHeight + window.scrollY)

      if (distanceToBottom - 50 < 0) setReachedBottom(true)
      else setReachedBottom(false)
    }

    window.addEventListener("scroll", andleScroll)
    return () => {
      window.removeEventListener("scroll", andleScroll)
    }
  }, [])

  return (
    <>
      {isModalOpen && <Modal />}
      <div className="comments m-auto mt-6 max-w-3xl px-3">
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

        <div className="sticky bottom-0 z-40 bg-light-grey pt-0 shadow-[0_0px_10px_rgba(84,87,182,0.432)]">
          <CommentReply mainReplySection={true} />
        </div>

        <button
          onClick={ScrollToBottom}
          className={`${
            reachedBottom ? "tablet:bottom-[-40px]" : "tablet:bottom-[21.7%]"
          } hidden tablet:fixed tablet:right-[1%] tablet:z-50 tablet:grid tablet:place-items-center tablet:rounded-lg tablet:bg-moderate-blue tablet:px-3 tablet:py-[10px] tablet:text-center tablet:text-xl tablet:font-medium tablet:uppercase tablet:text-white tablet:transition-all tablet:duration-300 tablet:hover:opacity-[0.5] tablet:focus-visible:opacity-[0.5] tablet:focus-visible:outline tablet:focus-visible:outline-1 tablet:focus-visible:outline-offset-2 tablet:focus-visible:outline-moderate-blue`}>
          <ArrowDown />
        </button>
      </div>
    </>
  )
}

export default memo(Comments)
