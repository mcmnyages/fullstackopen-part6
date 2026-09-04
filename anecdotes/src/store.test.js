import { it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
vi.mock('./services/anecdotes', () => ({
    default: {
        getAll: vi.fn(),
        createNew: vi.fn(),
        update: vi.fn(),
        remove: vi.fn()
    }
}))
import anecdoteService from './services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useAnecdotesActions,} from './store'

beforeEach(() => {
    useAnecdoteStore.setState({
        anecdotes: [],
        filters: '',
    })
    vi.clearAllMocks()
}
)

it('initializes anecdotes from backend', async () => {
    const anecdotes = [
        {
            id: 1,
            content: 'First anecdote',
            votes: 5
        },
        {
            id: 2,
            content: 'Second anecdote',
            votes: 2
        }
    ]

    anecdoteService.getAll.mockResolvedValue(anecdotes)

    const { result } = renderHook(() => useAnecdotesActions())

    await act(async () => {
        await result.current.initialize()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())

    expect(anecdotesResult.current).toEqual(anecdotes)
})


it('returns anecdotes sorted by votes', () => {
    const anecdotes = [
        { id: 1, content: 'A', votes: 2 },
        { id: 2, content: 'B', votes: 10 },
        { id: 3, content: 'C', votes: 5 }
    ]

    useAnecdoteStore.setState({ anecdotes })

    const { result } = renderHook(() => useAnecdotes())

    expect(result.current).toEqual([
        { id: 2, content: 'B', votes: 10 },
        { id: 3, content: 'C', votes: 5 },
        { id: 1, content: 'A', votes: 2 }
    ])
})

it('returns anecdotes matching the filter', () => {
    const anecdotes = [
        { id: 1, content: 'JavaScript is great', votes: 5 },
        { id: 2, content: 'React is fun', votes: 3 },
        { id: 3, content: 'JavaScript is weird', votes: 8 }
    ]

    useAnecdoteStore.setState({
        anecdotes,
        filters: 'javascript'
    })

    const { result } = renderHook(() => useAnecdotes())

    expect(result.current).toEqual([
        { id: 3, content: 'JavaScript is weird', votes: 8 },
        { id: 1, content: 'JavaScript is great', votes: 5 }
    ])
})

it('voting increases anecdote votes', async () => {
  const anecdote = {
    id: 1,
    content: 'Test anecdote',
    votes: 5
  }

  useAnecdoteStore.setState({
    anecdotes: [anecdote]
  })

  anecdoteService.update.mockResolvedValue({
    ...anecdote,
    votes: 6
  })

  const { result } = renderHook(() => useAnecdotesActions())

  await act(async () => {
    await result.current.vote(1)
  })

  const { result: anecdotesResult } = renderHook(() => useAnecdotes())

  expect(anecdotesResult.current[0].votes).toBe(6)
})

