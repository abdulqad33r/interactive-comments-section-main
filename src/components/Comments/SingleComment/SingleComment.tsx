import React, { FC, useState, useEffect, memo } from "react"
import {
  Comment,
  CommentReply,
  SingleCommentProps,
  useAppDispatch,
  useAppSelector,
} from "../../Container"
import {
  SetDeletCommentId,
  SetIsModalOpen,
  SetComments,
} from "../../../redux/CommentsSlice"

const SingleComment: FC<SingleCommentProps> = ({
  id,
  mainCommentId,
  comment,
  openReplySection,
  setOpenReplySection,
  ToggleReplyOpen,
}) => {
  const { currentUser, comments } = useAppSelector(
      (store) => store.postComments
    ),
    dispatch = useAppDispatch()

  const { username: currentUserName } = currentUser

  const [score, setScore] = useState<number>(comment.score),
    [scoreUpdate, setScoreUpdate] = useState<{
      added: boolean
      removed: boolean
    }>({ added: false, removed: true }),
    [isEditing, setIsEditing] = useState<boolean>(false),
    [textareaValue, setTextareaValue] = useState<string>(""),
    [invalidTextarea, setInvalidTextareaValue] = useState<boolean>(true)

  const HandleUpdateComment = () => {
    const updatedComments: Comment[] = comments.map((comment) => {
      if (comment.id === id) return { ...comment, content: textareaValue }
      else {
        const updatedReplies = comment.replies?.map((reply) => {
          if (reply.id === id) return { ...reply, content: textareaValue }
          else return reply
        })

        return { ...comment, replies: updatedReplies }
      }
    })

    dispatch(SetComments(updatedComments))
    setIsEditing(false)
  }

  useEffect(() => {
    // To check if user is not typing spaces only or textarea is empty
    const set = new Set(textareaValue.split(" ").map((_) => _))

    setInvalidTextareaValue([...set].length === 1 && [...set][0] === "")
  }, [textareaValue])

  return (
    <div className="singleComment my-4">
      <div
        className={`comment-main relative z-[1] grid grid-cols-12 grid-rows-3 items-start justify-items-start rounded-lg bg-white px-3 py-4 phone:px-6 ${
          isEditing || openReplySection === id ? "" : "phone:pb-8 "
        }`}>
        <div className="col-span-12 row-span-full flex h-fit items-center gap-2 phone:my-auto phone:gap-4 tablet:col-start-2 tablet:row-start-1 tablet:row-end-2">
          <picture className="h-fit w-fit">
            <source
              srcSet={import.meta.env.BASE_URL + comment.user.image.webp}
              type="image/webp"
            />
            <source
              srcSet={import.meta.env.BASE_URL + comment.user.image.png}
              type="image/png"
            />
            <img
              className="w-[35px] max-w-none"
              src={import.meta.env.BASE_URL + comment.user.image.webp}
              alt="user-photo"
            />
          </picture>

          <p className="font-bold">{comment.user.username}</p>

          {comment.user.username === currentUserName && (
            <p className="rounded-sm bg-moderate-blue px-2 py-[1px] text-xs font-medium text-white">
              you
            </p>
          )}

          <p>{comment.createdAt}</p>
        </div>

        <div className="comment-userData col-span-12 row-span-3 w-full tablet:col-start-2 tablet:row-start-2 ">
          {isEditing ? (
            <textarea
              className="reply-input focus:grayish-blue mt-2 h-20 w-full resize-none rounded-md border border-light-grayish-blue px-3 py-1 outline-0 focus:border-grayish-blue"
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
            />
          ) : (
            <p className="userContent mx-2 my-3">
              <span className="mr-2 font-bold text-moderate-blue">
                {comment.replyingTo && "@" + comment.replyingTo}
              </span>
              {comment.content}
            </p>
          )}
        </div>

        <div
          className={`counter-controls col-span-4 flex rounded-lg bg-very-light-grey text-[17px] font-medium tablet:col-start-1 tablet:col-end-3 tablet:row-start-1 tablet:row-end-4 tablet:flex-col ${
            scoreUpdate.added ? "bg-green-100" : ""
          }`}>
          <button
            type="button"
            disabled={scoreUpdate.added}
            className="px-2 py-1 text-light-grayish-blue transition duration-300 hover:text-moderate-blue focus-visible:rounded-l-xl focus-visible:text-moderate-blue focus-visible:outline focus-visible:outline-1 focus-visible:outline-moderate-blue disabled:h-0 disabled:w-0 disabled:p-0 disabled:opacity-0 disabled:duration-0 disabled:hover:text-light-grayish-blue phone:px-[10px] phone:py-[2px] tablet:focus-visible:rounded-t-xl tablet:focus-visible:rounded-es-none"
            onClick={() => {
              setScoreUpdate({ added: true, removed: false })
              !scoreUpdate.added && setScore((pre) => pre + 1)
            }}>
            +
          </button>

          <span className="grid place-items-center px-2 text-moderate-blue tablet:px-0 tablet:py-2">
            {score}
          </span>

          <button
            type="button"
            disabled={scoreUpdate.removed}
            className="px-3 py-1 text-light-grayish-blue transition duration-300 hover:text-moderate-blue focus-visible:rounded-r-xl focus-visible:text-moderate-blue focus-visible:outline focus-visible:outline-1 focus-visible:outline-moderate-blue disabled:h-0 disabled:w-0 disabled:p-0 disabled:opacity-0 disabled:duration-0 disabled:hover:text-light-grayish-blue 
            phone:px-[10px] phone:py-[2px] tablet:focus-visible:rounded-b-xl tablet:focus-visible:rounded-se-[0]"
            onClick={() => {
              setScoreUpdate({ added: false, removed: true })
              !scoreUpdate.removed && setScore((pre) => pre - 1)
            }}>
            -
          </button>
        </div>

        {comment.user.username === currentUserName && (
          <div className="col-span-8 ml-auto flex flex-wrap items-center justify-end gap-2 phone:my-auto phone:gap-2 tablet:col-start-9 tablet:col-end-[-1] tablet:row-start-1">
            {isEditing ? (
              <button
                onClick={() => {
                  setIsEditing(false)
                  setTextareaValue("")
                }}
                className="rounded-md bg-soft-red px-4 py-1 text-center text-sm font-medium text-white transition-all duration-300 hover:opacity-[0.5] focus-visible:opacity-[0.5] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-soft-red">
                Cancel
              </button>
            ) : (
              <button
                onClick={() => {
                  dispatch(SetIsModalOpen(true))
                  dispatch(SetDeletCommentId(id))
                }}
                className="flex items-center px-2 text-soft-red transition duration-300 hover:opacity-[0.5] focus-visible:rounded-md focus-visible:opacity-[0.5] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-soft-red">
                <span className="mr-1">
                  <img
                    className="max-w-none"
                    src={import.meta.env.BASE_URL + "/images/icon-delete.svg"}
                    alt="delete-icon"
                  />
                </span>
                Delete
              </button>
            )}

            {isEditing ? (
              <button
                onClick={HandleUpdateComment}
                disabled={comment.content === textareaValue || invalidTextarea}
                className="rounded-md bg-moderate-blue px-4 py-1 text-center text-sm font-medium text-white transition-all duration-300 hover:opacity-50 focus-visible:opacity-50 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-moderate-blue disabled:opacity-50">
                Update
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsEditing(true)
                  setTextareaValue(comment.content)
                }}
                className="flex items-center px-2 text-moderate-blue transition-all duration-300 hover:opacity-[0.5] focus-visible:rounded-md focus-visible:opacity-[0.5] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-moderate-blue">
                <span className="mr-1">
                  <img
                    className="max-w-none"
                    src={import.meta.env.BASE_URL + "/images/icon-edit.svg"}
                    alt="edit-icon"
                  />
                </span>
                Edit
              </button>
            )}
          </div>
        )}
      </div>

      {comment.user.username !== currentUserName && (
        <CommentReply
          id={comment.id}
          mainCommentId={mainCommentId}
          openReplySection={openReplySection}
          ToggleReplyOpen={ToggleReplyOpen}
          isEditing={isEditing}
        />
      )}

      {comment.replies && comment.replies?.length !== 0 && (
        <div className="flex w-full">
          <div className="my-4 mr-3 h-auto w-[1px] bg-light-grayish-blue phone:mx-[3%] phone:mr-[5%]" />

          <div className="w-full">
            {comment.replies?.map((reply) => (
              <SingleComment
                key={reply.id}
                id={reply.id}
                mainCommentId={mainCommentId}
                comment={reply}
                openReplySection={openReplySection}
                setOpenReplySection={setOpenReplySection}
                ToggleReplyOpen={ToggleReplyOpen}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default memo(SingleComment)
