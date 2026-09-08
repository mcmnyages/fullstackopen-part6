import { useAnecdotes, useAnecdotesActions } from "../store"
import { useNotificationActions } from "../notificationStore"

const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    const { vote, removeAnecdote } = useAnecdotesActions()
    const { setNotification } = useNotificationActions()
    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
    const handleVote = (id) => {
        const anecdote = sortedAnecdotes.find(content => content.id === id)
        vote(id)
        setNotification(`you voted '${anecdote.content}'`)
    }
    return (
        <div>
            {sortedAnecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote.id)}>vote</button>
                        {anecdote.votes === 0 && (
                            <button onClick={() => removeAnecdote(anecdote.id)}>
                                delete
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AnecdoteList