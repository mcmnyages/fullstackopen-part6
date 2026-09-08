import useAnecdotes from "../hooks/useAnecdotes"

const AnecdoteForm = () => {
  const { newAnecdote} = useAnecdotes()
  const onCreate = async(event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    const result= await newAnecdote(content)
    console.log('Results',result)
    if(result){
    event.target.reset()
    }
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