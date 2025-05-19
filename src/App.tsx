import './App.css'
import Header from './Header'
import { useGetWordOfDay } from './useGetWordOfDay'
import WordGrid from './WordGrid'

function App() {
  const wordOfDay = useGetWordOfDay()

  return (
    <>
      <Header />
      <WordGrid wordOfDay={wordOfDay} />
    </>
  )
}

export default App
