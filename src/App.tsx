import { useEffect } from "react"
import { Comments } from "./components/Container"
import { GetCurrentUser } from "./redux/CommentsSlice"
import { useAppDispatch } from "./redux/Store"

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(GetCurrentUser())
  }, [dispatch])

  return <Comments />
}

export default App
