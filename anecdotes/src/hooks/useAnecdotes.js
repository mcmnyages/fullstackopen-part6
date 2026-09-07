import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteService from '../services/anecdotes'

const useAnecdotes = () => {
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAll,
    retry: 1,
  })

  const newAnecdote = useMutation({
    mutationFn: anecdoteService.createNew,
    onSuccess: (newAnecdotes) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'],anecdotes.concat(newAnecdotes))
    }
  })
  const vote =useMutation({
    mutationFn:anecdoteService.update,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['anecdotes']})
    }
  })
  return {
    anecdotes:result.data,
    isLoading:result.isLoading,
    isError:result.isError,
    addAnecdote:(anecdote)=>newAnecdote.mutate({content:anecdote,votes:0}),
    addVote:(anecdote)=>vote.mutate({
        id:anecdote.id,
        anecdote:{...anecdote,votes:anecdote.votes+1}
      })
    }
}

export default useAnecdotes
