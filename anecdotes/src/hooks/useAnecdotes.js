import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteService from '../services/anecdotes'

const useAnecdotes = () => {
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAll,
    retry: 1,
  })

  const create = useMutation({
    mutationFn: anecdoteService.createNew,
    onSuccess: (newAnecdotes) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'],anecdotes.concat(newAnecdotes))
    }
  })
  return {
    anecdotes:result.data,
    isLoading:result.isLoading,
    isError:result.isError,
    create
  }
}

export default useAnecdotes
