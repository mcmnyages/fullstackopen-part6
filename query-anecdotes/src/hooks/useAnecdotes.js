import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from '../requests'
import useNotify from './useNotify'
const useAnecdotes = () => {
  const queryClient = useQueryClient()
  const { notify } = useNotify()
  const response = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  const addAnecdote = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      notify(`${newAnecdote.content} created`)
    }
  })

  const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  return {
    anecdotes: response.data,
    isPending: response.isPending,
    isError: response.isError,
    newAnecdote: (anecdote) => {
      if (anecdote.length < 5) {
        notify('too short anecdote, must have length 5 or more')
        return false
      }
     return addAnecdote.mutateAsync(anecdote)
    },
    addAnecdoteSuccess: addAnecdote.isSuccess,
    addVote: (anecdote) => {
      voteMutation.mutateAsync({
        ...anecdote, votes: anecdote.votes + 1
      })
      notify(`anecdote '${anecdote.content}' voted`)
    },
    addVoteSuccess: voteMutation.isSuccess
  }
}

export default useAnecdotes
