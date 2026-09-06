import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import useAnecdotes from "./hooks/useAnecdotes"

const App = () => {
  const { isError } = useAnecdotes()
  if (isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
