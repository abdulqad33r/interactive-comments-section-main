import { configureStore } from "@reduxjs/toolkit"
import CommentsSlice from "./CommentsSlice"
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux"

export const store = configureStore({
  reducer: { postComments: CommentsSlice },
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector
