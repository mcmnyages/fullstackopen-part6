import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import Filter from "./components/Filter"
import anecdotesService from './services/anacdotes'
import {useAnecdotesActions} from './store'
import { useEffect } from "react"

const App = () => {
  const {initialize}= useAnecdotesActions()
  useEffect(()=>{
     anecdotesService.getAll().then(anecdotes=>initialize(anecdotes))
  },[initialize])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter/>
      <AnecdoteList />
      <AnecdoteForm/>
    </div>
  )
}

export default App
