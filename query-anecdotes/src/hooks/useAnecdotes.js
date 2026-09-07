import { useQuery,useMutation,useQueryClient } from '@tanstack/react-query'
import { getAnecdotes,createAnecdote} from '../requests'

const useAnecdotes = () => {
    const queryClient =  useQueryClient()
  const response = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })

  const addAnecdote =useMutation({
    mutationFn:createAnecdote,
    onSuccess:(newAnecdote)=>{
        const anecdotes = queryClient.getQueryData(['anecdotes'])
        queryClient.setQueryData(['anecdotes'],anecdotes.concat(newAnecdote))
    }
  })
  return {
    anecdotes: response.data,
    isPending: response.isPending,
    isError: response.isError,
    newAnecdote:(anecdote)=>addAnecdote.mutate(anecdote)
  }
}

export default useAnecdotes
