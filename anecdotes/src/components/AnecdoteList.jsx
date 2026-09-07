import { useNotificationActions } from "../notificationStore"
import useAnecdotes from '../hooks/useAnecdotes'

const AnecdoteList = () => {
    const { anecdotes, isLoading,addVote:vote} = useAnecdotes()
    const { setNotification } = useNotificationActions()
    if (isLoading) {
        return <div>Loading anecdotes...</div>
    }
    const sortedAnecdotes = [...anecdotes].sort(
        (a, b) => b.votes - a.votes
    )
    const handleVote = (id) => {
        const anecdote = sortedAnecdotes.find(content => content.id === id)
        vote(anecdote)
        setNotification(`you voted '${anecdote.content}'`)
    }
    return (
        <div>
            <div>
                {sortedAnecdotes.map((anecdote) => (
                    <div key={anecdote.id}>
                        <div>{anecdote.content}</div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => handleVote(anecdote.id)}>
                                vote
                            </button>
                            {anecdote.votes === 0 && (
                                <button onClick={() => (anecdote.id)}>
                                    delete
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AnecdoteList