import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'
import anecdoteService from './services/anecdotes'

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filters: '',
  actions: {
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set({ anecdotes })
    },
    vote: async (id) => {
      const anecdote = get().anecdotes.find(a => a.id === id)
      const updatedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
      const response = await anecdoteService.update(id, updatedAnecdote)
      set(state => ({
        anecdotes: state.anecdotes.map(a => a.id === id ? response : a)
      }))

    },
    add: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content)
      set((state) => ({

        anecdotes: state.anecdotes.concat(newAnecdote)
      }))
    },
    removeAnecdote: async (id) => {
      const anecdote = get().anecdotes.find(a => a.id === id)

      if (anecdote.votes !== 0) {
        return
      }

      await anecdoteService.remove(id)

      set(state => ({
        anecdotes: state.anecdotes.filter(a => a.id !== id)
      }))
    },
    setFilters: value => set({ filters: value })
  },
}))

export const useAnecdotes = () =>
  useAnecdoteStore(useShallow(({ anecdotes, filters }) => {
    return anecdotes.filter(anecdote =>
      anecdote.content?.toLowerCase().includes(filters.toLowerCase())).sort((a, b) => b.votes - a.votes)
  })
  )
export const useAnecdotesActions = () => useAnecdoteStore((state) => state.actions)
export const useFilters = () => useAnecdoteStore((state) => state.filters)
export default useAnecdoteStore