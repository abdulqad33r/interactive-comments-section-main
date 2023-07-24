import { useEffect, memo } from "react"
import { Comments, useAppDispatch } from "./components/Container"
import { GetCurrentUser } from "./redux/CommentsSlice"

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(GetCurrentUser())
  }, [])

  return <Comments />
}

export default memo(App)
