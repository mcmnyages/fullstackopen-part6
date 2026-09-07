import useAnecdotes from "../hooks/useAnecdotes"

const AnecdoteForm = () => {
  const { newAnecdote } = useAnecdotes()
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if(content.length<5){
      alert('Should have 5 characters or more')
    }
    newAnecdote(content)
    event.target.reset()
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm