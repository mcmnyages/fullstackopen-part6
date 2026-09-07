import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from '../requests'

const useAnecdotes = () => {
  const response = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })

  return {
    anecdotes: response.data,
    isPending: response.isPending,
    isError: response.isError
  }
}

export default useAnecdotes
