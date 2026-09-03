import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'
import anecdoteService from './services/anacdotes'


const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filters: '',
  actions: {
    initialize: anecdotes => set({ anecdotes }),
    vote: (id) => set((state) => ({
      anecdotes: state.anecdotes.map(anecdote => {
        return anecdote.id === id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote
      })
    })),
    add: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content)
      console.log('NEW ANECDOTE:', newAnecdote)

      set((state) => ({

        anecdotes: state.anecdotes.concat(newAnecdote)
      }))
    },
    setFilters: value => set({ filters: value })
  },
}))

export const useAnecdotes = () => useAnecdoteStore(useShallow(({ anecdotes, filters }) => {
  return anecdotes.filter(anecdote => anecdote.content?.toLowerCase().includes(filters.toLowerCase()))
}))
export const useAnecdotesActions = () => useAnecdoteStore((state) => state.actions)
export const useFilters = () => useAnecdoteStore((state) => state.filters)
