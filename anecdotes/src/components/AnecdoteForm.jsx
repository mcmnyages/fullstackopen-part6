import useAnecdotes from "../hooks/useAnecdotes"

const AnecdoteForm = () => {
    const { addAnecdote:add } = useAnecdotes()

    const addAnecdote = async(e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        if(content.length<5){
            alert('Content must be more than 5 characters')
            return
        }
        add(content)
        e.target.reset()
    }
    return (<div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
            <div>
                <input data-testid="new" name="anecdote" />
            </div>
            <button >create</button>
        </form>
    </div>
    )
}

export default AnecdoteForm