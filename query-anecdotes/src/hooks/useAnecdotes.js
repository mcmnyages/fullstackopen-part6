import { useQuery,useMutation,useQueryClient } from '@tanstack/react-query'
import { getAnecdotes,createAnecdote,updateAnecdote} from '../requests'

const useAnecdotes = () => {
    const queryClient =  useQueryClient()
  const response = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry:1
  })

  const addAnecdote =useMutation({
    mutationFn:createAnecdote,
    onSuccess:(newAnecdote)=>{
        const anecdotes = queryClient.getQueryData(['anecdotes'])
        queryClient.setQueryData(['anecdotes'],anecdotes.concat(newAnecdote))
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
    newAnecdote:(anecdote)=>addAnecdote.mutate(anecdote),
    addVote: (anecdote)=>voteMutation.mutate({
      ...anecdote,votes:anecdote.votes+1
    })
  }
}

export default useAnecdotes
