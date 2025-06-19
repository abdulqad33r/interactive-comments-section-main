import { FC, useEffect, useRef, useState } from "react"
import "./CommentReply.scss"
import { CommentReplyProps } from "../../Container"
import { SetComments } from "../../../redux/CommentsSlice"
import { useAppDispatch, useAppSelector } from "../../../redux/Store"

const CommentReply: FC<CommentReplyProps> = ({
  id,
  mainCommentId,
  openReplySection,
  isEditing,
  mainReplySection,
  ToggleReplyOpen,
  ScrollToBottom,
}) => {
  const { currentUser, mainComments } = useAppSelector(
      (store) => store.postComments
    ),
    dispatch = useAppDispatch()

  const { username: currentUserName, image: currentUserImages } = currentUser
  const [textareaValue, setTextareaValue] = useState<string>(""),
    [invalidTextarea, setInvalidTextareaValue] = useState<boolean>(true)

  const replyTextareaRef = useRef<HTMLTextAreaElement>(null)

  const HandleAddComment = () => {
    replyTextareaRef.current && replyTextareaRef.current.focus()

    const generateID = new Date().getTime()
    if (mainReplySection) {
      if (!invalidTextarea) {
        const newComment = {
          id: generateID,
          content: textareaValue,
          createdAt: new Date().toString(),
          score: 0,
          user: {
            image: {
              png: currentUserImages.png,
              webp: currentUserImages.webp,
            },
            username: currentUserName,
          },
          replies: [],
        }

        dispatch(SetComments([...mainComments, newComment]))

        if (ScrollToBottom) ScrollToBottom("instant")
      }
    } else {
      ToggleReplyOpen && id && ToggleReplyOpen(id)

      const SingleComment = (username: string) => {
        return {
          id: generateID,
          content: textareaValue,
          createdAt: new Date().toString(),
          score: 0,
          replyingTo: username,
          user: {
            image: {
              png: currentUserImages.png,
              webp: currentUserImages.webp,
            },
            username: currentUserName,
          },
        }
      }

      if (!invalidTextarea) {
        const updatedComments = mainComments.map((comment) => {
          if (comment.id === mainCommentId) {
            const updatedReplies = [
              ...(comment.replies || []),
              SingleComment(comment.user.username),
            ]

            return { ...comment, replies: updatedReplies }
          }
          return comment
        })

        dispatch(SetComments(updatedComments))

        setTimeout(() => {
          document
            .getElementById(`comment-${generateID}`)
            ?.scrollIntoView({ behavior: "smooth", block: "center" })
        })
      }
    }

    setTextareaValue("")
  }

  useEffect(() => {
    // To check if user is not typing spaces only or textarea is empty
    const set = new Set(textareaValue.split(" ").map((_) => _))

    setInvalidTextareaValue([...set].length === 1 && [...set][0] === "")
  }, [textareaValue])

  return (
    <div
      id={"_" + id}
      className={`comment-reply relative grid grid-cols-4 gap-4 rounded-lg bg-white px-6 py-4 transition-all duration-500 [--bigPhone]:flex [--bigPhone]:items-start [--bigPhone]:pr-36 ${
        openReplySection === id
          ? "mt-1"
          : "-mt-[160px] [--bigPhone]:-mt-[112px]"
      }`}
    >
      <picture className="col-span-2 row-end-3">
        <source
          srcSet={import.meta.env.BASE_URL + currentUserImages.webp}
          type="image/webp"
        />
        <source
          srcSet={import.meta.env.BASE_URL + currentUserImages.png}
          type="image/png"
        />
        <img
          className="w-8"
          src={import.meta.env.BASE_URL + currentUserImages.webp}
          alt="currentUser-photo"
        />
      </picture>

      <textarea
        ref={replyTextareaRef}
        className={`reply-input focus:grayish-blue col-span-4 h-20 w-full resize-none rounded-md border border-light-grayish-blue px-3 py-2 outline-0 focus:border-grayish-blue`}
        value={textareaValue}
        onChange={(e) => setTextareaValue(e.target.value)}
      />
      <button
        type="button"
        disabled={mainReplySection ? invalidTextarea : false}
        onClick={HandleAddComment}
        style={{
          transition: `color 1000ms, padding 1000ms cubic-bezier(0.4, 0, 0.2, 1), bottom 500ms, ${
            openReplySection === id
              ? "opacity 500ms"
              : "background-color 300ms, opacity 500ms"
          }`,
        }}
        className={`absolute right-[24px] z-2 col-span-2 flex gap-3 rounded-md px-6 font-medium uppercase hover:opacity-50 focus-visible:opacity-[0.5] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-moderate-blue disabled:opacity-50 ${
          openReplySection === id
            ? "bottom-4 bg-moderate-blue py-2 text-center text-white [--bigPhone]:bottom-[calc(100%-40px-16px)]"
            : "bottom-[16px] flex items-center text-moderate-blue"
        } ${isEditing ? "pointer-events-none opacity-0" : ""}`}
      >
        <img
          className={`transition-all duration-500 ${
            openReplySection === id ? "-ml-6" : "ml-0"
          }`}
          src={import.meta.env.BASE_URL + "/images/icon-reply.svg"}
          alt="reply_icon"
        />
        {mainReplySection ? "Send" : "Reply"}
      </button>
    </div>
  )
}

export default CommentReply
